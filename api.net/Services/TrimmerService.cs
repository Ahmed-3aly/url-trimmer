namespace api.net.Services
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using api.net.Entities;
    using api.net.Interfaces;
    using api.net.Models;
    using api.net.Utils;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    public class TrimmerService : ITrimmerService
    {
        IGeneratorService HasherService { get; set; }
        AppDbContext DbContext { get; set; }
        IConfiguration Config { get; }
        public string UriPrefix => Config["UriPrefix"];
        int UriSuffixLength
        {
            get
            {
                var v = Config["UriSuffix"];
                if (int.TryParse(v, out int n))
                {
                    return n;
                }
                return 8;
            }
        }
        public void Dispose()
        {
            if (DbContext == null)
            {
                return;
            }
            DbContext.Dispose();
        }
        public TrimmerService(
            AppDbContext dbContext,
            IGeneratorService hasherService,
            IConfiguration config
        )
        {
            DbContext = dbContext;
            HasherService = hasherService;
            Config = config;
        }
        public async Task<PageModel<List<TrimUriModel>>> GetPageAsync(
            int index,
            int perPage
        )
        {
            if (index < 1)
            {
                throw new ArgumentException();
            }
            var page = await DbContext.TrimUrls.GetPageAsync(
                index,
                perPage
            );
            var cast = page
                .List
                .Select(x => new TrimUriModel(
                    x.Address,
                    UriPrefix + x.HashCode
                )).ToList();
            return new PageModel<List<TrimUriModel>>(
                page.Index,
                page.Count,
                cast
            );
        }
        public async Task<TrimUriModel> TrimUrlAsync(
            string address
        )
        {
            if (address == null)
            {
                throw new ArgumentException();
            }
            address = address.Trim();
            if (string.IsNullOrEmpty(address))
            {
                throw new ArgumentException();
            }
            address = address.ToLower();
            if (!Uri.TryCreate(address, UriKind.Absolute, out Uri uriResult))
            {
                throw new ArgumentException();
            }
            var result = new TrimUriModel(address);
            var find = await DbContext
                .TrimUrls
                .Where(x => x.Address == address)
                .FirstOrDefaultAsync();
            if (find != null)
            {
                result.Trimmed = UriPrefix + find.HashCode;
                return result;
            }
            var key = "";
            do
            {
                key = HasherService.Generate(UriSuffixLength);
                var conflict = await DbContext
                    .TrimUrls
                    .AnyAsync(x => x.HashCode.ToLower() == key);
                if (!conflict)
                {
                    break;
                }
            }
            while (true);
            var append = new TrimUrlEntity
            {
                Address = address,
                HashCode = key,
            };
            DbContext.TrimUrls.Add(append);
            await DbContext.SaveChangesAsync();
            result.Trimmed = UriPrefix + key;
            return result;
        }
    }
}

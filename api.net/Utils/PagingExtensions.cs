namespace api.net.Utils
{
    using Microsoft.EntityFrameworkCore;
    using api.net.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    static public class PagingExtensions
    {
        static public async Task<PageModel<List<T>>> GetPageAsync<T>
        (
            this IQueryable<T> input,
            int index,
            int perPage
        )
        {
            var match = await input.CountAsync();
            var pages = (double)match / (double)perPage;
            var count = (int)Math.Ceiling(pages);
            if (index > count)
            {
                index = count;
            }
            if (index > 1)
            {
                var skip = ((index - 1) * perPage);
                input = input.Skip(skip);
            }
            var result = await input
                .Take(perPage)
                .ToListAsync();
            return new PageModel<List<T>>
            (
                index,
                count,
                result
            );
        }
    }
}

namespace api.net.Interfaces
{
    using api.net.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface ITrimmerService : IDisposable
    {
        Task<PageModel<List<TrimUriModel>>> GetPageAsync
        (
            int index,
            int perPage
        );
        Task<TrimUriModel> TrimUrlAsync(
            string address
        );
    }
}

namespace api.net.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using api.net.Interfaces;
    using api.net.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    [ApiController]
    [Route("api/[controller]")]
    public class TrimUrlController : ControllerBase
    {
        readonly ITrimmerService TrimService;
        public TrimUrlController(
            ITrimmerService trimService
        )
        {
            TrimService = trimService;
        }

        [HttpPost]
        public async Task<ActionResult<TrimUriModel>> TrimUrl(
            [FromBody] string address
        )
        {
            try
            {
                var result = await TrimService
                    .TrimUrlAsync(address);
                return Ok(result);
            }
            catch (Exception x)
            {
                return StatusCode(
                    500,
                    x.Message
                );
            }
        }
        [HttpGet]
        public async Task<ActionResult<PageModel<List<TrimUriModel>>>> GetPage(
            [FromQuery] int index,
            [FromQuery] int perPage
        )
        {
            if (perPage < 1)
            {
                perPage = 5;
            }
            if (index < 1)
            {
                index = 1;
            }
            try
            {
                var result = await TrimService
                    .GetPageAsync(index, perPage);
                return Ok(result);
            }
            catch (Exception x)
            {
                return StatusCode(
                    500,
                    x.Message
                );
            }

        }
    }
}

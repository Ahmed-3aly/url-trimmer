namespace api.net.tests
{
    using Microsoft.EntityFrameworkCore;
    using api.net.Models;
    using api.net.Services;
    using api.net.tests.helpers;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Xunit;
    public class TrimmerServiceTests
    {
        static public readonly string[] InvalidInputs = new string[]
        {
            null,
            " ",
            "domain.com",
        };
        static public readonly string[] ValidInputs = new string[]
        {
            "http://google.com",
            "http://apple.com",
            "http://microsoft.com",
        };
        [Fact]
        public async Task InvalidInputsTests()
        {
            // arrange
            var generator = new GeneratorService();
            using (var scope = new TestScope())
            using (var context = scope.ConnectDb())
            using (
                var instance = new TrimmerService(
                    context,
                    generator,
                    scope.Config
                )
            )
            {
                // act
                var invalid = true;
                foreach (var key in InvalidInputs)
                {
                    try
                    {
                        await instance.TrimUrlAsync(key);
                    }
                    catch
                    {
                        continue;
                    }
                    invalid = false;
                    break;
                }
                // assert
                Assert.True(invalid);
            }
        }
        [Fact]
        public async Task ValidInputsTests()
        {
            // arrange
            var generator = new GeneratorService();
            using (var scope = new TestScope())
            using (var context = scope.ConnectDb())
            using (
                var instance = new TrimmerService(
                    context,
                    generator,
                    scope.Config
                )
            )
            {
                // act
                var urls = new List<string>();
                foreach (var key in ValidInputs)
                {
                    var val = await instance
                        .TrimUrlAsync(key);
                    urls.Add(val.Print());
                }
                var list = await context
                    .TrimUrls
                    .ToListAsync();
                var cast = list.Select(i =>
                {
                    var j = new TrimUriModel(
                        i.Address,
                        instance.UriPrefix + i.HashCode
                    );
                    return j.Print();
                }).ToList();
                var match = Enumerable.SequenceEqual(urls, cast);
                // assert
                Assert.True(match);
            }
        }
    }
}

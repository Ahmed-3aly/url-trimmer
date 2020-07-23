namespace api.net.tests
{
    using Newtonsoft.Json;
    using api.net.Models;
    using api.net.Services;
    using api.net.tests.helpers;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Xunit;
    public class EndPointTests
    {
        [Fact]
        public async Task GetPageTests()
        {
            // arrange
            var generator = new GeneratorService();
            using (var scope = new TestScope())
            using (var client = scope.Arrange())
            using (var context = scope.ConnectDb())
            using (
                var instance = new TrimmerService(
                    context,
                    generator,
                    scope.Config
                )
            )
            {
                var address = "/api/trimUrl";
                var domains = TrimmerServiceTests.ValidInputs;
                //
                // act
                var list_1 = new List<string>();
                foreach (var i in domains)
                {
                    var append = await client
                        .PostStringAsync(address, i);
                    if (!append.IsSuccessStatusCode)
                    {
                        continue;
                    }
                    var trimUri = await append
                        .Content
                        .ReadAsStringAsync();
                    list_1.Add(trimUri);
                }
                var response = await client.GetAsync(
                    address + "?page=1&perPage=2"
                );
                if (!response.IsSuccessStatusCode)
                {
                    return;
                }
                var text = await response.Content.ReadAsStringAsync();
                var cast = JsonConvert.DeserializeObject<
                    PageModel<Dictionary<string, string>>
                >(text);
                var list_2 = cast.List.Values.ToList();
                list_2.Sort();
                var match = Enumerable.SequenceEqual(list_1, list_2);
                // assert
                Assert.True(match);
            }
        }
        [Fact]
        public async Task TrimUriTests()
        {
            // arrange
            var generator = new GeneratorService();
            using (var scope = new TestScope())
            using (var client = scope.Arrange())
            using (var context = scope.ConnectDb())
            using (
                var instance = new TrimmerService(
                    context,
                    generator,
                    scope.Config
                )
            )
            {
                var address = "/api/trimUrl";
                var domains = TrimmerServiceTests.ValidInputs;
                //
                // act
                var list_1 = new List<string>();
                foreach (var i in domains)
                {
                    var response = await client
                        .PostStringAsync(address, i);
                    if (!response.IsSuccessStatusCode)
                    {
                        continue;
                    }
                    var trimUri = await response
                        .Content
                        .ReadAsStringAsync();
                    list_1.Add(trimUri);
                }
                var list_2 = context
                    .TrimUrls
                    .Select(x => instance.UriPrefix + x.HashCode)
                    .ToList();
                list_1.Sort();
                list_2.Sort();
                var match = Enumerable.SequenceEqual(list_1, list_2);
                // assert
                Assert.True(match);
            }
        }
    }
}

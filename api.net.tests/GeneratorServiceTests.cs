namespace api.net.tests
{
    using api.net.Interfaces;
    using api.net.Services;
    using System.Text.RegularExpressions;
    using Xunit;
    public class GeneratorServiceTests
    {
        const int Length = 8;
        [Fact]
        public void GenerateTests()
        {
            // arrange
            var instance = new GeneratorService();
            var service = instance as IGeneratorService;
            var matcher = @"^[a-z0-9]*$";
            var regex = new Regex(matcher);
            // act
            var hashCode = service.Generate(8);
            var match = regex.Match(hashCode);
            // assert
            Assert.False(string.IsNullOrEmpty(hashCode));
            Assert.True(hashCode.Length == Length);
            Assert.True(match.Success);
        }
    }
}

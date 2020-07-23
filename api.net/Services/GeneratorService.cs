namespace api.net.Services
{
    using api.net.Interfaces;
    using System;
    using System.Linq;
    public class GeneratorService :
        IGeneratorService
    {
        readonly Random Random =
            new Random();
        readonly string[] Range =
            "0123456789abcdefghijjklmnopqrstuvwxyz"
            .ToCharArray()
            .Select(x => x.ToString())
            .ToArray();
        public string Generate(
            int length
        )
        {
            var result = "";
            for (var i = 0; i < length; i++)
            {
                var n = Random.Next(
                    0,
                    Range.Length
                );
                result += Range[n];
            }
            return result;
        }
    }
}

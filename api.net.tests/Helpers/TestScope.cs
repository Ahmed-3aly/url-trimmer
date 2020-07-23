namespace api.net.tests.helpers
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.TestHost;
    using Microsoft.Extensions.Configuration;
    using api.net.Entities;
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    public class TestScope : IDisposable
    {
        public TestServer Server { get; private set; }
        public TestScope()
        {
            var builder = new WebHostBuilder()
                .UseStartup<TestStartup>();
            Server = new TestServer(builder);
        }
        IConfiguration _config;
        public IConfiguration Config
        {
            get
            {
                if (_config != null)
                {
                    return _config;
                }
                var vals = new Dictionary<string, string>
                {
                    {"UriPrefix", "https://pbid.io/"},
                    {"UriSuffixLength", "8"},
                };
                _config = new ConfigurationBuilder()
                    .AddInMemoryCollection(vals)
                    .Build();
                return _config;
            }
        }
        public AppDbContext ConnectDb()
        {
            var context = Server
                .Host
                .Services
                .GetService(
                    typeof(AppDbContext)
                ) as AppDbContext;
            context
                .Database
                .EnsureCreated();
            return context;
        }
        public HttpClient Arrange()
        {
            return Server.CreateClient();
        }
        public void Dispose()
        {
            Server.Dispose();
        }
    }
}

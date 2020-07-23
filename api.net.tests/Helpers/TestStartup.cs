namespace api.net.tests.helpers
{
    using api.net;
    using api.net.Entities;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Data.Sqlite;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    public class TestStartup : Startup
    {
        public TestStartup(
            IConfiguration configuration
        ) : base(
            configuration
        )
        {

        }

        protected override void ConfigureSwagger(
            IServiceCollection services
        )
        {
            return;
        }
        protected override void UseSwagger(
            IApplicationBuilder app
        )
        {
            return;
        }
        protected override void ConfigureDb(
            IServiceCollection services
        )
        {
            var connection = new SqliteConnection(
                "DataSource=:memory:"
            );
            connection.Open();
            services.AddDbContext<AppDbContext>(x =>
                x.UseSqlite(connection)
            );
        }
    }
}

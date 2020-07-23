namespace api.net
{
    using api.net.Entities;
    using api.net.Interfaces;
    using api.net.Services;
    using api.net.Utils;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.PlatformAbstractions;
    using System.IO;
    public class Startup
    {
        public IConfiguration Config { get; }
        string ConnectionString => Config
            .GetConnectionString("DefaultConnection");
        public Startup(
            IConfiguration config
        )
        {
            Config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(
            IServiceCollection services
        )
        {
            services.AddMvc(
                o => o.InputFormatters.Insert(0, new TextPlainFormatter())
            );
            services.AddControllers(
                o => o.InputFormatters.Insert(0, new TextPlainFormatter())
            );
            ConfigureSwagger(services);
            ConfigureDb(services);
            services.AddSingleton(
                typeof(IGeneratorService),
                typeof(GeneratorService)
            );
            services.AddScoped(
                typeof(ITrimmerService),
                typeof(TrimmerService)
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env
        )
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            UseSwagger(app);
        }

        protected virtual void ConfigureSwagger(
            IServiceCollection services
        )
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "URL TRIM API",
                });
                // Set the comments path for the Swagger JSON and UI.
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var xmlPath = Path.Combine(basePath, "Swagger.xml");
                options.IncludeXmlComments(xmlPath);
            });
        }
        protected virtual void UseSwagger(
            IApplicationBuilder app
        )
        {
            app.UseSwagger().UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(
                    "/swagger/v1/swagger.json",
                    "URL TRIM API V1"
                );
            });
        }
        protected virtual void ConfigureDb(
            IServiceCollection services
        )
        {
            services.AddDbContext<AppDbContext>(
                x => x.UseSqlServer(ConnectionString)
            );
        }

    }
}

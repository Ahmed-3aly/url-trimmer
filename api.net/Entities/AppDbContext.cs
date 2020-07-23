﻿namespace api.net.Entities
{
    using Microsoft.EntityFrameworkCore;
    public class AppDbContext : DbContext
    {
        public DbSet<TrimUrlEntity> TrimUrls { get; set; }
        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {

        }
    }
}

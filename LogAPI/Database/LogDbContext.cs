using LogAPI.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace LogAPI.Database
{
    public class LogDbContext : IdentityDbContext<User>
    {
        public LogDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );

            builder.Entity<Log>().Property(c => c.dtServer).HasDefaultValueSql("getdate()");

            builder.Entity<Log>().HasIndex(c => c.Username);

            builder.Entity<Trace>().HasIndex(c => c.Username);

            builder.Entity<Trace>().Property(c => c.Date).HasDefaultValueSql("getdate()");
        }

        public DbSet<Log> Logs { get; set; }

        public DbSet<Trace> Traces { get; set; }
    }
}
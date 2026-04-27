using EventHorizon_API.Data.Configurations;
using EventHorizon_API.Models;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models.Owners;
using Microsoft.EntityFrameworkCore;

namespace EventHorizon_API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Person> People { get; set; }

        public DbSet<BankAccount> BankAccounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new OwnerConfiguration());
            modelBuilder.ApplyConfiguration(new PersonConfiguration());
            modelBuilder.ApplyConfiguration(new CompanyConfiguration());
            modelBuilder.ApplyConfiguration(new BankAccountConfiguration());
        }
    }
}

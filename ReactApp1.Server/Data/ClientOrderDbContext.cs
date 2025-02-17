using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Model;

namespace ReactApp1.Server.Data
{
    public class ClientOrderDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Product> Product { get; set; } = default!;

        private List<string> _userRoles = new List<string> { "Admin", "User", "Manager" };
        public ClientOrderDbContext(DbContextOptions<ClientOrderDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasMany<Bill>().WithOne(p => p.User);
            modelBuilder.Entity<Bill>().HasMany<Product>().WithOne(p => p.Bill);

            SeedData(modelBuilder);
        }
        public DbSet<Bill> Bill { get; set; } = default!;
        public DbSet<User> User { get; set; } = default!;

        private async void SeedData(ModelBuilder modelBuilder)
        {

            //Seed Bill

        }
    }
}

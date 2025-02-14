using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Model;

namespace ReactApp1.Server.Data
{
    public class ClientOrderDbContext : DbContext
    {
        public DbSet<Product> Product { get; set; } = default!;
        public ClientOrderDbContext(DbContextOptions<ClientOrderDbContext> dbContextOptions) : base(dbContextOptions) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasMany<Bill>().WithOne(p => p.User);
            modelBuilder.Entity<Bill>().HasMany<Product>().WithOne(p=> p.Bill);
            modelBuilder.Entity<UserAuthentication>().HasIndex(p => p.Username).IsUnique();

        }
        public DbSet<Bill> Bill { get; set; } = default!;
        public DbSet<User> User { get; set; } = default!;
        public DbSet<UserAuthentication> UserAuthentication { get; set; } = default!;
       
    }
}

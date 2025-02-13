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
        }
        public DbSet<ReactApp1.Server.Model.Bill> Bill { get; set; } = default!;
        public DbSet<ReactApp1.Server.Model.User> User { get; set; } = default!;
        
    }
}

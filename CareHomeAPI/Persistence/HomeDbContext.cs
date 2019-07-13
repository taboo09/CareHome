using CareHomeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CareHomeAPI.Persistence
{
    public class HomeDbContext :  DbContext
    {
        public DbSet<Home> Homes { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Qualification> Qualifications { get; set; }

        public HomeDbContext(DbContextOptions<HomeDbContext> options) : base(options)
        {
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareHomeAPI.Models;
using CareHomeAPI.Persistence.Core;
using Microsoft.EntityFrameworkCore;

namespace CareHomeAPI.Persistence
{
    public class AppRepository : IAppRepository
    {
        private readonly HomeDbContext _context;
        public AppRepository(HomeDbContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Qualification> FindQualification(int id)
        {
            return await _context.Qualifications.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Staff> FindStaff(int id)
        {
            var staff = await _context.Staffs.Include(q => q.Qualifications).SingleOrDefaultAsync(x => x.Id == id);

            staff.Qualifications = staff.Qualifications.OrderByDescending(x => x.Date).ToList();

            return staff;
        }

        public async Task<IEnumerable<Home>> GetHomes()
        {
            return await _context.Homes.Include(s => s.Staffs).ToListAsync();
        }

        public async Task<bool> CheckHomeName(string name)
        {
            return await _context.Homes.AnyAsync(x => x.Name.ToLower() == name.ToLower());
        }

        public async Task<Home> GetHome(int id)
        {
            return await _context.Homes.Include(s => s.Staffs).SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}
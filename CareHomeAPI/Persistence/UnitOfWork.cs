using System.Threading.Tasks;
using CareHomeAPI.Persistence.Core;

namespace CareHomeAPI.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HomeDbContext _context;
        public UnitOfWork(HomeDbContext context)
        {
            _context = context;

        }
        public async Task SaveAll()
        {
            await _context.SaveChangesAsync();
        }
    }
}
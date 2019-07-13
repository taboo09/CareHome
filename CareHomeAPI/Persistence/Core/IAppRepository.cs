using System.Collections.Generic;
using System.Threading.Tasks;
using CareHomeAPI.Models;

namespace CareHomeAPI.Persistence.Core
{
    public interface IAppRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<IEnumerable<Home>> GetHomes();
        Task<bool> CheckHomeName(string name);
        Task<Staff> FindStaff(int id);
        Task<Qualification> FindQualification(int id);
        Task<Home> GetHome(int id);
    }
}
using System.Threading.Tasks;

namespace CareHomeAPI.Persistence.Core
{
    public interface IUnitOfWork
    {
        Task SaveAll();
    }
}
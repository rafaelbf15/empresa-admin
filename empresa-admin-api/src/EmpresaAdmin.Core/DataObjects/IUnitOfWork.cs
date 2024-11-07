using System.Threading.Tasks;

namespace EmpresaAdmin.Core.DataObjects
{
    public interface IUnitOfWork
    {
        Task<bool> Commit();
    }
}

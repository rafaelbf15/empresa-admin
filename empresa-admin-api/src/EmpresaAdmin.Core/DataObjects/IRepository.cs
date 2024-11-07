using EmpresaAdmin.Core.DomainObjects;
using System;

namespace EmpresaAdmin.Core.DataObjects
{
    public interface IRepository<TEntity> : IDisposable where TEntity : IAggregateRoot
    {
        IUnitOfWork UnitOfWork { get; }
    }
}

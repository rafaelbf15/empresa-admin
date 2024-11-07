using EmpresaAdmin.Core.DataObjects;
using EmpresaAdmin.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpresaAdmin.Domain.Interfaces
{
    public interface IFuncionarioRepository : IRepository<Funcionario>
    {
        void Cadastrar(Funcionario funcionario);
        void Atualizar(Funcionario funcionario);
        Task<Funcionario> ObterPorId(Guid id);
        Task<IEnumerable<Funcionario>> ObterTodos();
        Task<IEnumerable<Funcionario>> ObterFuncionariosPorLiderId(Guid liderId);
        Task<int> ObterNumeroChapa();
    }
}

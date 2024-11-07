using EmpresaAdmin.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpresaAdmin.Domain.Interfaces
{
    public interface IFuncionarioService
    {
        Task<bool> Cadastrar(Funcionario funcionario);
        Task<bool> Atualizar(Funcionario funcionario);  
        Task<bool> Desativar(Funcionario funcionario);
        Task<bool> Ativar(Funcionario funcionario);
    }
}

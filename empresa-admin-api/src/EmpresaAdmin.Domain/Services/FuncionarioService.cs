using EmpresaAdmin.Core.DataObjects;
using EmpresaAdmin.Core.Notifications;
using EmpresaAdmin.Core.Services;
using EmpresaAdmin.Domain.Interfaces;
using EmpresaAdmin.Domain.Models;
using EmpresaAdmin.Domain.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpresaAdmin.Domain.Services
{
    public class FuncionarioService : BaseService, IFuncionarioService
    {
        private readonly IFuncionarioRepository _funcionarioRepository;

        public FuncionarioService(IFuncionarioRepository funcionarioRepository, INotificator notificator) : base(notificator)
        {
            _funcionarioRepository = funcionarioRepository;
        }

        public async Task<bool> Atualizar(Funcionario funcionario)
        {
            if (!ExecValidation(new FuncionarioValidation(), funcionario)) return false;

            _funcionarioRepository.Atualizar(funcionario);

            return await _funcionarioRepository.UnitOfWork.Commit();
        }

        public async Task<bool> Cadastrar(Funcionario funcionario)
        {
            if (!ExecValidation(new FuncionarioValidation(), funcionario)) return false;

            var numeroChapa = await _funcionarioRepository.ObterNumeroChapa();

            funcionario.DefinirNumeroChapa(numeroChapa);    

            _funcionarioRepository.Cadastrar(funcionario);

            return await _funcionarioRepository.UnitOfWork.Commit();
        }

        public async Task<bool> Desativar(Funcionario funcionario)
        {
            funcionario.Remover();

            _funcionarioRepository.Atualizar(funcionario);

            return await _funcionarioRepository.UnitOfWork.Commit();
        }

        public async Task<bool> Ativar(Funcionario funcionario)
        {
            funcionario.Ativar();

            _funcionarioRepository.Atualizar(funcionario);

            return await _funcionarioRepository.UnitOfWork.Commit();
        }
    }
}

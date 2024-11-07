using Asp.Versioning;
using AutoMapper;
using EmpresaAdmin.API.Controllers;
using EmpresaAdmin.API.ViewModels;
using EmpresaAdmin.Core.DomainObjects;
using EmpresaAdmin.Core.Notifications;
using EmpresaAdmin.Core.Options;
using EmpresaAdmin.Domain.Interfaces;
using EmpresaAdmin.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using EmpresaAdmin.Core.Helpers;
using EmpresaAdmin.API.Services;
using EmpresaAdmin.API.Models;

namespace EmpresaAdmin.API.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Authorize]
    public class FuncionarioController : MainController
    {
        private readonly IFuncionarioService _funcionarioService;
        private readonly IFuncionarioRepository _funcionarioRepository;
        private readonly AuthenticationService _authService;

        public FuncionarioController(
            AuthenticationService authService,
            IFuncionarioService funcionarioService,
            IFuncionarioRepository funcionarioRepository,
            IUser user,
            IMapper mapper,
            INotificator notificator,
            IOptions<AppSettingsConfig> appSettings)
            : base(user, mapper, notificator, appSettings)
        {
            _authService = authService;
            _funcionarioService = funcionarioService;
            _funcionarioRepository = funcionarioRepository;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> ObterFuncionarios()
        {
            var funcionarios = await _funcionarioRepository.ObterTodos();

            if (!funcionarios.IsAny())
                return CustomResponse();

            var funcionariosViewModel = _mapper.Map<IEnumerable<FuncionarioViewModel>>(funcionarios);

            return CustomResponse(funcionariosViewModel);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> ObterFuncionarioPorId(Guid id)
        {
            if (!ModelState.IsValid)
            {
                AdicionarErroProcessamento("Não foi possível obter dados do funcionário, contate o suporte ou tente novamente!");
                return CustomResponse();
            }

            var funcionario = await _funcionarioRepository.ObterPorId(id);

            if (funcionario == null)
                return CustomResponse();

            var funcionarioViewModel = _mapper.Map<FuncionarioViewModel>(funcionario);

            return CustomResponse(funcionarioViewModel);
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CadastrarFuncionario([FromBody] FuncionarioViewModel model)
        {
            if (!ModelState.IsValid)
            {
                AdicionarErroProcessamento("Não foi possível cadastrar o funcionário, contate o suporte ou tente novamente!");
                return CustomResponse(model);
            }

            var user = new ApplicationUser
            {
                Name = model.Nome,
                Surname = model.Sobrenome,
                UserName = model.EmailCorporativo,
                Email = model.EmailCorporativo,
                EmailConfirmed = true,
                Active = true
            };

            string senha = Utils.GerarSenha();

            var result = await _authService.UserManager.CreateAsync(user, senha);
            if (result.Succeeded)
            {
                var funcionario = _mapper.Map<Funcionario>(model);

                funcionario.DefinirSenhaHash(Utils.CriptografarSenha(senha));
                funcionario.DefinirUserId(Guid.Parse(user.Id));

                if (!await _funcionarioService.Cadastrar(funcionario))
                {
                    await _authService.UserManager.DeleteAsync(user);

                    AdicionarErroProcessamento("Não foi possível cadastrar o funcionário, contate o suporte ou tente novamente!");
                    return CustomResponse(model);
                }
            }

            return CustomResponse(model);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> AtualizarFuncionario(Guid id, [FromBody] FuncionarioViewModel model)
        {
            if (!ModelState.IsValid)
            {
                AdicionarErroProcessamento("Não foi possível atualizar o funcionário, contate o suporte ou tente novamente!");
                return CustomResponse(model);
            }

            var funcionario = await _funcionarioRepository.ObterPorId(id);

            if (funcionario == null)
            {
                AdicionarErroProcessamento("Não foi possível encontrar o funcionário, contate o suporte ou tente novamente!");
                return CustomResponse(model);
            }

            funcionario.Nome = model.Nome;
            funcionario.Sobrenome = model.Sobrenome;
            funcionario.EmailCorporativo = model.EmailCorporativo;
            funcionario.NumeroChapa = model.NumeroChapa;
            funcionario.Telefones = model.Telefones;
            funcionario.LiderId = model.LiderId;

            if (!await _funcionarioService.Atualizar(funcionario))
            {
                AdicionarErroProcessamento("Não foi possível atualizar o funcionário, contate o suporte ou tente novamente!");
                return CustomResponse(model);
            }

            return CustomResponse(model);
        }

        [HttpPatch]
        [Route("{id:guid}")]
        public async Task<IActionResult> DesativarFuncionario(Guid id)
        {
            if (!ModelState.IsValid)
            {
                AdicionarErroProcessamento("Não foi possível desativar o funcionário, contate o suporte ou tente novamente!");
                return CustomResponse();
            }

            var funcionario = await _funcionarioRepository.ObterPorId(id);
            if (funcionario == null)
            {
                AdicionarErroProcessamento("Funcionário não encontrado.");
                return CustomResponse();
            }

            if (!await _funcionarioService.Desativar(funcionario))
            {
                AdicionarErroProcessamento("Não foi possível desativar o funcionário, contate o suporte ou tente novamente!");
                return CustomResponse();
            }

            return CustomResponse(id);
        }

        [HttpPatch]
        [Route("{id:guid}/ativo")]
        public async Task<IActionResult> AtivarFuncionario(Guid id)
        {
            if (!ModelState.IsValid)
            {
                AdicionarErroProcessamento("Não foi possível ativar o funcionário, contate o suporte ou tente novamente!");
                return CustomResponse();
            }

            var funcionario = await _funcionarioRepository.ObterPorId(id);
            if (funcionario == null)
            {
                AdicionarErroProcessamento("Funcionário não encontrado.");
                return CustomResponse();
            }

            if (!await _funcionarioService.Ativar(funcionario))
            {
                AdicionarErroProcessamento("Não foi possível ativar o funcionário, contate o suporte ou tente novamente!");
                return CustomResponse();
            }

            return CustomResponse(id);
        }
    }
}

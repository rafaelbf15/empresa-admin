using System.Threading.Tasks;
using Asp.Versioning;
using AutoMapper;
using EmpresaAdmin.API.Models;
using EmpresaAdmin.API.Services;
using EmpresaAdmin.Core.DomainObjects;
using EmpresaAdmin.Core.Notifications;
using EmpresaAdmin.Core.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace EmpresaAdmin.API.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/auth")]
    public class AuthController : MainController
    {
        private readonly AuthenticationService _authenticationService;

        public AuthController(AuthenticationService authenticationService,
                              IUser appUser,
                              IMapper autoMapper,
                              INotificator notificator,
                              IOptions<AppSettingsConfig> appSettings
            ) : base(appUser, autoMapper, notificator, appSettings)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("nova-conta")]
        public async Task<ActionResult> Registrar(UsuarioRegistro usuarioRegistro)
        {
            if (!ModelState.IsValid)
            {
                AdicionarErroProcessamento("Não foi possível cadastrar usuário, tente novamente ou contate o suporte!");
                return CustomResponse(ModelState);
            }

            var user = new ApplicationUser
            {
                Name = usuarioRegistro.Nome,
                Surname = usuarioRegistro.Sobrenome,
                UserName = usuarioRegistro.Email,
                Email = usuarioRegistro.Email,
                EmailConfirmed = true,
                Active = true
            };

            var result = await _authenticationService.UserManager.CreateAsync(user, usuarioRegistro.Senha);
           
            if (result.Succeeded) 
                return CustomResponse(usuarioRegistro);

            foreach (var error in result.Errors)
            {
                AdicionarErroProcessamento(error.Description);
            }

            return CustomResponse();
        }

        [HttpPost("autenticar")]
        public async Task<ActionResult> Login(UsuarioLogin usuarioLogin)
        {
            if (!ModelState.IsValid)
            {
                AdicionarErroProcessamento("Não foi possível autenticar, tente novamente ou contate o suporte!");
                return CustomResponse(ModelState);
            }

            var result = await _authenticationService.SignInManager.PasswordSignInAsync(usuarioLogin.Email, usuarioLogin.Senha,
                false, true);

            if (result.Succeeded)
            {
                var user = await _authenticationService.UserManager.FindByEmailAsync(usuarioLogin.Email);

                if (!user.Active)
                {
                    AdicionarErroProcessamento("Usuário bloqueado");

                    return CustomResponse();
                }

                return CustomResponse(await _authenticationService.GerarJwt(null, usuarioLogin.Email));
            }

            if (result.IsLockedOut)
            {
                AdicionarErroProcessamento("Usuário temporariamente bloqueado por tentativas inválidas");
                return CustomResponse();
            }

            AdicionarErroProcessamento("Usuário ou Senha incorretos");
            return CustomResponse();
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenModel model)
        {
            var token = await _authenticationService.ObterRefreshToken(model.Refresh);

            if (token is null)
            {
                AdicionarErroProcessamento("Refresh Token expirado");
                return CustomResponse();
            }

            return CustomResponse(await _authenticationService.GerarJwt(null, token.Username));
        }
    }
}
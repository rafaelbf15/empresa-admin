using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EmpresaAdmin.Core.Communication;
using EmpresaAdmin.Core.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;
using EmpresaAdmin.Core.DomainObjects;
using EmpresaAdmin.Core.Options;
using EmpresaAdmin.Core.Helpers;

namespace EmpresaAdmin.API.Controllers
{

    [ApiController]
    public class MainController : ControllerBase
    {
        public readonly IUser AppUser;
        protected readonly IMapper _mapper;
        protected readonly INotificator _notificator;
        protected readonly Guid userId;
        protected readonly AppSettingsConfig _appSettings;

        public MainController(IUser appUser,
                              IMapper mapper,
                              INotificator notificator,
                              IOptions<AppSettingsConfig> appSettings
            )
        {
            AppUser = appUser;
            _mapper = mapper;
            _notificator = notificator;
            _appSettings = appSettings.Value;
            userId = appUser.GetUserId();
        }

        protected List<string> Erros = new List<string>();

        protected ActionResult CustomResponse(object result = null)
        {
            AtribuirNotificacoes();

            if (OperacaoValida())
            {
                return Ok(result);
            }

            return BadRequest(new ValidationProblemDetails(new Dictionary<string, string[]>
            {
                { "Mensagens", Erros.ToArray() }
            }));
        }

        protected ActionResult CustomResponse(ResponseResult resposta)
        {
            ResponsePossuiErros(resposta);

            return CustomResponse();
        }

        protected bool ResponsePossuiErros(ResponseResult resposta)
        {
            if (resposta == null || !resposta.Erros.Mensagens.Any()) return false;

            foreach (var mensagem in resposta.Erros.Mensagens)
            {
                AdicionarErroProcessamento(mensagem);
            }

            return true;
        }

        protected bool OperacaoValida()
        {
            return !Erros.IsAny();
        }

        protected void AdicionarErroProcessamento(string erro)
        {
            Erros.Add(erro);
        }

        protected void LimparErrosProcessamento()
        {
            Erros.Clear();
        }

        protected void NotificarErro(string mensagem)
        {
            _notificator.Handle(new Notification(mensagem));
        }

        private void AtribuirNotificacoes()
        {
            if (_notificator.HasNotifications())
            {
                Erros.AddRange(_notificator.GetNotifications().Select(n => n.Message));
            }
        }
    }
}

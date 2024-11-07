using Microsoft.Extensions.DependencyInjection;
using EmpresaAdmin.Core.Notifications;
using Microsoft.AspNetCore.Http;
using EmpresaAdmin.Infra.Context;
using EmpresaAdmin.Data.Repository;
using EmpresaAdmin.Domain.Interfaces;
using EmpresaAdmin.Domain.Services;
using EmpresaAdmin.API.Extensions;
using EmpresaAdmin.Core.DomainObjects;
using EmpresaAdmin.API.Services;
using EmpresaAdmin.API.Data;

namespace EmpresaAdmin.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            //Auth
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<AuthenticationService>();
            services.AddScoped<IUser, AspNetUser>();

            //Contexts
            services.AddScoped<ApplicationDbContext>();
            services.AddScoped<FuncionarioDbContext>();

            //Repository
            services.AddScoped<IFuncionarioRepository, FuncionarioRepository>();

            // Services
            services.AddScoped<IFuncionarioService, FuncionarioService>();

            // Notifications
            services.AddScoped<INotificator, Notificator>();
        }
    }
}

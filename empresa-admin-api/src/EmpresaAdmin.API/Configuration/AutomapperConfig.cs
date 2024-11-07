using AutoMapper;
using EmpresaAdmin.API.ViewModels;
using EmpresaAdmin.Domain.Models;
using System.Collections.Generic;
using System.Linq;

namespace EmpresaAdmin.API.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {

            CreateMap<Funcionario, FuncionarioViewModel>()
                .ForMember(dest => dest.NomeLider, opt => opt.MapFrom(src => src.Lider != null ? $"{src.Lider.Nome} {src.Lider.Sobrenome}" : null))
                .ForMember(dest => dest.Senha, opt => opt.Ignore());

            CreateMap<FuncionarioViewModel, Funcionario>()
                .ForMember(dest => dest.SenhaHash, opt => opt.Ignore()) 
                .ForMember(dest => dest.Lider, opt => opt.Ignore()); 

        }
    }
}

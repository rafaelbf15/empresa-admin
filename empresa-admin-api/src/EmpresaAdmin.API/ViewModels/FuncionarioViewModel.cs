using System.Collections.Generic;
using System;
using System.Linq;

namespace EmpresaAdmin.API.ViewModels
{
    public class FuncionarioViewModel
    {
        public Guid Id { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public string EmailCorporativo { get; set; }

        public int NumeroChapa { get; set; }

        public string Telefones { get; set; }

        public List<string> TelefoneList { get; set; }

        public Guid? LiderId { get; set; }

        public string NomeLider { get; set; } 

        public string Senha { get; set; }

        public Guid? UserId { get; set; }

        public DateTime? DataCadastro { get; set; }

        public DateTime? DataRemocao { get; set; }
    }
}

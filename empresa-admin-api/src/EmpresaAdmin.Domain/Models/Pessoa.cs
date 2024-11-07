using EmpresaAdmin.Core.DomainObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpresaAdmin.Domain.Models
{
    public class Pessoa : Entity
    {
        public string Nome { get; set; }

        public string Sobrenome { get; set; }
    }
}

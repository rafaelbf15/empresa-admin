using EmpresaAdmin.Core.DomainObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EmpresaAdmin.Domain.Models
{
    public class Funcionario : Pessoa, IAggregateRoot
    {
        public string EmailCorporativo { get; set; }

        public int NumeroChapa { get; set; }

        public string Telefones { get; set; }

        [NotMapped]
        public List<string> TelefoneList => DefinirTelefones();

        public Guid? LiderId { get; set; }

        public string SenhaHash { get; set; }

        public Guid? UserId { get; set; }

        //EF Rel
        public virtual Funcionario Lider { get; set; }

        public Funcionario(){ }

        public void DefinirSenhaHash(string  senhaHash) => SenhaHash = senhaHash; 
        public void DefinirUserId(Guid? userId) => UserId = userId;
        public List<string> DefinirTelefones() => !string.IsNullOrEmpty(Telefones)? Telefones.Split(',').ToList() : new List<string>();
        public void DefinirNumeroChapa(int numeroChapa) => NumeroChapa = numeroChapa;
    }

}

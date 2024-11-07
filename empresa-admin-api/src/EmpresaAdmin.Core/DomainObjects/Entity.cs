using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmpresaAdmin.Core.DomainObjects
{
    public abstract class Entity
    {
        public Guid Id { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime? DataRemocao { get; set; }

        [NotMapped]
        public ValidationResult ValidationResult { get; set; }

        public Entity()
        {
            Id = Guid.NewGuid();
        }

        public void Remover()
        {
            DataRemocao = DateTime.UtcNow;
        }

        public void Ativar()
        {
            DataRemocao = null;
        }
    }
}

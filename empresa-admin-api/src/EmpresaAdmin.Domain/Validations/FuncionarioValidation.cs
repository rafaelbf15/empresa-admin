using EmpresaAdmin.Domain.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpresaAdmin.Domain.Validations
{
    public class FuncionarioValidation : AbstractValidator<Funcionario>
    {
        public FuncionarioValidation()
        {
            RuleFor(f => f.Nome)
                .NotEmpty().WithMessage("O nome do funcionário é obrigatório.")
                .MaximumLength(100).WithMessage("O nome do funcionário deve ter no máximo 100 caracteres.");

            RuleFor(f => f.Sobrenome)
                .NotEmpty().WithMessage("O sobrenome do funcionário é obrigatório.")
                .MaximumLength(100).WithMessage("O sobrenome do funcionário deve ter no máximo 100 caracteres.");

            RuleFor(f => f.EmailCorporativo)
                .NotEmpty().WithMessage("O e-mail corporativo é obrigatório.")
                .EmailAddress().WithMessage("O e-mail corporativo deve ser válido.")
                .MaximumLength(150).WithMessage("O e-mail corporativo deve ter no máximo 150 caracteres.");

            RuleFor(f => f.SenhaHash)
                .NotEmpty().WithMessage("A senha é obrigatória.");
        }
    }
}

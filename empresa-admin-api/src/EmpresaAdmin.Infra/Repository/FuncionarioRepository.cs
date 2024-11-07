using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmpresaAdmin.Core.DataObjects;
using EmpresaAdmin.Domain.Interfaces;
using EmpresaAdmin.Domain.Models;
using EmpresaAdmin.Infra.Context;

namespace EmpresaAdmin.Data.Repository
{
    public class FuncionarioRepository : IFuncionarioRepository
    {
        private readonly FuncionarioDbContext _context;

        public FuncionarioRepository(FuncionarioDbContext context)
        {
            _context = context;
        }

        public IUnitOfWork UnitOfWork => _context;

        public void Atualizar(Funcionario funcionario)
        {
            _context.Funcionarios.Update(funcionario);
        }

        public void Cadastrar(Funcionario funcionario)
        {
           _context.Funcionarios.Add(funcionario);
        }

        public async Task<IEnumerable<Funcionario>> ObterFuncionariosPorLiderId(Guid liderId)
        {
            return await _context.Funcionarios.AsNoTracking()
                .Include(x => x.Lider)
                .Where(x => x.LiderId == liderId).ToListAsync();
        }

        public async Task<Funcionario> ObterPorId(Guid id)
        {
            return await _context.Funcionarios.AsNoTracking()
                .Include(x => x.Lider)
                .FirstOrDefaultAsync(x => x.Id == id); 
        }

        public async Task<IEnumerable<Funcionario>> ObterTodos()
        {
            return await _context.Funcionarios.AsNoTracking()
                .Include(x => x.Lider)
                .ToListAsync();
        }

        public async Task<int> ObterNumeroChapa()
        {
            // Obtém o maior valor de `NumeroChapa` e soma 1 para o próximo número
            var ultimoNumeroChapa = await _context.Funcionarios
                .AsNoTracking()
                .MaxAsync(f => (int?)f.NumeroChapa) ?? 0;

            return ultimoNumeroChapa + 1;
        }

        public void Dispose() => _context?.Dispose();
    }
}

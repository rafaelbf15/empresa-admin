using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using EmpresaAdmin.Domain.Models;

namespace EmpresaAdmin.Data.Mappings
{
    public class VendaConfiguration : IEntityTypeConfiguration<Funcionario>
    {
        public void Configure(EntityTypeBuilder<Funcionario> builder)
        {
            builder.ToTable("Funcionarios");

            builder.HasKey(f => f.Id);

            builder.Property(f => f.Nome)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(f => f.Sobrenome)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(f => f.EmailCorporativo)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(f => f.SenhaHash)
                .IsRequired();

            builder.Property(f => f.Telefones)
                .HasColumnType("varchar(500)");

            builder.HasOne(f => f.Lider)
                .WithMany()
                .HasForeignKey(f => f.LiderId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}

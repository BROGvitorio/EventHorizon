using EventHorizon_API.Models.Owners;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventHorizon_API.Data.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> company)
        {
            company.ToTable("companies");

            // Configuração TPT: Company herda de Owner
            // A chave primária de Company é a mesma de Owner (relação 1:1)

            company.Property(c => c.Cnpj)
                .HasMaxLength(14)
                .IsRequired();
            company.HasIndex(c => c.Cnpj)
                .IsUnique();

            company.Property(c => c.FantasyName)
                .HasMaxLength(255)
                .IsRequired();

            company.Property(c => c.MonthlyIncome)
                .HasPrecision(15, 2)
                .IsRequired();
        }
    }
}

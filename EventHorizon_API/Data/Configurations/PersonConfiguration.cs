using EventHorizon_API.Models.Owners;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventHorizon_API.Data.Configurations
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> person)
        {
            person.ToTable("people");

            // Configuração TPT: Person herda de Owner
            // A chave primária de Person é a mesma de Owner (relação 1:1)

            person.Property(p => p.Cpf)
                .HasMaxLength(11)
                .IsRequired();
            person.HasIndex(p => p.Cpf)
                .IsUnique();

            person.Property(p => p.FullName)
                .HasMaxLength(255)
                .IsRequired();

            person.Property(p => p.BirthDate)
                .HasMaxLength(8)
                .IsRequired();

            person.Property(p => p.Salary)
                .HasPrecision(15, 2);
        }
    }
}

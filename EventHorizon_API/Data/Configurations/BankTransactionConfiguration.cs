using EventHorizon_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventHorizon_API.Data.Configurations
{
    public class BankTransactionConfiguration : IEntityTypeConfiguration<BankTransaction>
    {
        public void Configure(EntityTypeBuilder<BankTransaction> transaction)
        {
            transaction.ToTable("transactions");

            transaction.HasKey(t => t.Id);

            transaction.Property(t => t.Category)
                .HasConversion<string>()
                .HasMaxLength(11)
                //.HasColumnType("enum")
                .IsRequired();

            transaction.Property(t => t.Amount)
                .HasPrecision(15, 2)
                .IsRequired();
        }
    }
}

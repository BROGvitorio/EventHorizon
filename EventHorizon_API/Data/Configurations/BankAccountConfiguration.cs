using EventHorizon_API.Models.BankAccounts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventHorizon_API.Data.Configurations
{
    // Configuração TPH: bank_accounts engloba os registros de business, checking e saving
    public class BankAccountConfiguration : IEntityTypeConfiguration<BankAccount>
    {
        public void Configure(EntityTypeBuilder<BankAccount> bankAccount)
        {
            bankAccount
                .UseTphMappingStrategy()
                .ToTable("bank_accounts");

            bankAccount.HasKey(ba => ba.Id);

            bankAccount.Property(ba => ba.Category)
                .HasConversion<string>()
                .HasMaxLength(10)
                .IsRequired();

            bankAccount.HasDiscriminator(ba => ba.Category)
                .HasValue<BusinessAccount>(BankAccount.AccountCategory.Business)
                .HasValue<CheckingAccount>(BankAccount.AccountCategory.Checking)
                .HasValue<SavingAccount>(BankAccount.AccountCategory.Saving);

            bankAccount.Property(ba => ba.Balance)
                .HasPrecision(15, 2)
                .HasDefaultValue(0)
                .IsRequired();

            bankAccount.Property(ba => ba.LoanLimit)
                .HasPrecision(15, 2)
                .IsRequired();

            bankAccount.Property(ba => ba.LoanDebt)
                .HasPrecision(15, 2)
                .HasDefaultValue(0)
                .IsRequired();

            bankAccount.Ignore(ba => ba.WithdrawalTax);

            bankAccount.HasMany(ba => ba.Transactions)
                .WithOne()
                .HasForeignKey(t => t.AccountId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

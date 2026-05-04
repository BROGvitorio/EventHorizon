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

            /*
                When querying for derived entities, which use the TPH pattern, EF Core adds a predicate over discriminator column in the query. 
                This filter makes sure that we don't get any additional rows for base types or sibling types not in the result. 
                This filter predicate is skipped for the base entity type since querying for the base entity will get results for all the entities in the hierarchy.


                Relational database providers, such as SQL Server, will not automatically use the discriminator predicate when querying shared columns when using a cast. 
                The query Url = (blog as RssBlog).Url would also return the Url value for the sibling Blog rows. 
                To restrict the query to RssBlog entities you need to manually add a filter on the discriminator, such as 
                Url = blog is RssBlog ? (blog as RssBlog).Url : null.
            */
            bankAccount.Property(ba => ba.Category)
                .HasConversion<string>()
                .HasMaxLength(10)
                .IsRequired();

            bankAccount.HasDiscriminator(ba => ba.Category)
                .HasValue<Business>(BankAccount.AccountCategory.business)
                .HasValue<Checking>(BankAccount.AccountCategory.checking)
                .HasValue<Saving>(BankAccount.AccountCategory.saving);

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
        }
    }
}

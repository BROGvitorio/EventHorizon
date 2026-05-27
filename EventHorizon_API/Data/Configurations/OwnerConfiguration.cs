using EventHorizon_API.Models.Owners;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventHorizon_API.Data.Configurations
{
    public class OwnerConfiguration : IEntityTypeConfiguration<Owner>
    {
        public void Configure(EntityTypeBuilder<Owner> owner)
        {
            owner.UseTptMappingStrategy()
                .ToTable("owners");

            owner.HasKey(o => o.Id);

            owner.HasMany(o => o.BankAccounts)
                .WithOne()
                .HasForeignKey(ba => ba.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

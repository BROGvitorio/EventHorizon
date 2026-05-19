using EventHorizon_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventHorizon_API.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> user)
        {
            user.ToTable("users");

            user.HasKey(u => u.Id);

            user.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(255);
            user.HasIndex(u => u.Email)
                .IsUnique();

            user.Property(u => u.LoginPassword)
                .IsRequired()
                .HasMaxLength(255);

            user.HasMany(u => u.Profiles)
                .WithOne()
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

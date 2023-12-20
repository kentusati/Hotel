using Hotel.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hotel.Infastructure.Configurations
{
    public class IdentityRoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasData(new Role
            {
                Name = "Admin",
                Id = Guid.NewGuid(),
            });

            builder.HasData(new Role
            {
                Name = "Manager",
                Id = Guid.NewGuid(),
            });

            builder.HasData(new Role
            {
                Name = "User",
                Id = Guid.NewGuid(),
            });
        }
    }
}

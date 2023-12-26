using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hotel.Infastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        
        public void Configure(EntityTypeBuilder<User> builder)
        {
            var adminUser = new User
            {
                Id = Guid.NewGuid(),
                Email = "Admin@gmail.com",
                UserName = "Admin",
            };

            var passwordHasher = new PasswordHasher<User>();
            adminUser.PasswordHash = passwordHasher.HashPassword(null, "ADMIN1234@admin");

            builder.HasData(adminUser);
        }
    }
}

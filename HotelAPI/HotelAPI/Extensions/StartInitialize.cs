using Hotel.Core.Interfaces;
using Hotel.Core.Services;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace Hotel.API.Extensions
{
    public class StartInitialize
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            var _roleService = serviceProvider.GetService<IRoleService>();
            var _userRep = serviceProvider.GetRequiredService<IUserService>();
            var users = await _userRep.GetAllUsers();
            foreach(var user in users)
            {
                if (user.UserName == "Admin") _roleService.AddToRoleAsync(user, "Admin");
            }
        }
    }
}

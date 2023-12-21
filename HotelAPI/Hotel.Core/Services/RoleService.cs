using Hotel.Core.Interfaces;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core.Services
{
    public class RoleService : IRoleService
    {
        private readonly RoleRepository _roleRepository;

        public RoleService(HotelAPIDBcontext dbContext)
        {
            this._roleRepository = new RoleRepository(dbContext);
        }

        public async void AddToRoleAsync(User user, string roleName)
        {
            var role = await _roleRepository.GetByRoleName(roleName);
            user.Role = role;
            user.roleId = role.Id;
        }
    }
}

using Hotel.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core.Interfaces
{
    public interface IRoleService
    {
        void AddToRoleAsync(User user, string roleName);
    }
}

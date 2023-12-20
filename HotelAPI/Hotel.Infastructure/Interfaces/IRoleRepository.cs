using Hotel.DataAccess.Models;
using Hotel.DataAccess.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infastructure.Interfaces
{
    public interface IRoleRepository : IDisposable
    {
        Task<Role> GetByRoleName(string roleName); // получение одного объекта по id
    }
}

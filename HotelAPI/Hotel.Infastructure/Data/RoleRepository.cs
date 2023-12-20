using Hotel.DataAccess.Models;
using Hotel.Infastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infastructure.Data
{
    public class RoleRepository : IRoleRepository
    {
        private readonly HotelAPIDBcontext _context;
        private readonly DbSet<Role> _dbSet;
        public RoleRepository(HotelAPIDBcontext context)
        {
            _context = context;
            _dbSet = context.Set<Role>();
        }

        public async Task<Role> GetByRoleName(string roleName)
        {
            var ListRoles = await _dbSet.ToListAsync();
            foreach (Role role in ListRoles)
            {
                if (role.Name == roleName) return role;
            }
            return null;
        }

        //----------------------------------------------------------

        private bool disposed = false;
        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}

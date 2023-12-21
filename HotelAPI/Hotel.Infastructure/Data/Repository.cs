using Hotel.DataAccess.Models;
using Hotel.DataAccess.Models.Base;
using Hotel.Infastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Hotel.Infastructure.Data
{
    public class Repository<T> : IRepository<T> where T : BaseEntity 
    {
        private readonly HotelAPIDBcontext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(HotelAPIDBcontext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllItemsAsync()
        {
             return await _dbSet.ToListAsync();
        }
        public async Task<IEnumerable<T>> GetAllItemsAsyncWithInclude(Expression<Func<T, BaseEntity>>? expression)
        {
            return await _dbSet.Include(expression).ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);

        }

        public Task<List<T>> FindAsync(Expression<Func<T, bool>>? expression, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, CancellationToken cancellationToken = default)
        {
            var query = expression != null ? _dbSet.Where(expression) : _dbSet;
            return orderBy != null
                ? orderBy(query).ToListAsync(cancellationToken)
                : query.ToListAsync(cancellationToken);
        }

        public async Task<T> AddAsync(T item)
        {
            var addingItem = await _dbSet.AddAsync(item);
            return addingItem.Entity;
        }
        public Task AddRangeAsync(List<T> entity)
        {
            _dbSet.FindAsync();
            return _dbSet.AddRangeAsync(entity);
        }

        public void Update(T item)
        {
            _dbSet.Attach(item);
            _context.Entry(item).State = EntityState.Modified;
        }
        public void UpdateRange(IEnumerable<T> items)
        {
            _dbSet.AttachRange(items);
            _dbSet.UpdateRange(items);
        }
    

    public void Delete(T item)
        {
            _dbSet.Remove(item);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }


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

using Hotel.DataAccess.Models.Base;

namespace Hotel.Infastructure.Interfaces
{
    public interface IRepository<T> : IDisposable
        where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllItemsAsync(); // получение всех объектов
        Task<T> GetByIdAsync(Guid id); // получение одного объекта по id
        Task<T> AddAsync(T item); // Создание объекта
        Task AddRangeAsync(List<T> items);
        void Update(T item); // обновление объекта
        void UpdateRange(IEnumerable<T> items);
        void Delete(T item); // удаление объекта по id
        Task SaveAsync();  // сохранение изменений
    }
}

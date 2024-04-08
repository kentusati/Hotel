using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;

namespace Hotel.Core.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrders(); // получение всех объектов
        Task<IEnumerable<Order>> GetOrderByUserId(Guid id); // получение одного объекта по id
        Task<Order> AddOrder(AddOrderRequest item); // создание объекта
        Task<Order> UpdateOrder(Guid id, AddOrderRequest item); // обновление объекта
        Task<Order> DeleteOrder(Guid id); // удаление объекта по id

    }
}

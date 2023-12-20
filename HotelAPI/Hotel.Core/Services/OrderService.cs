

using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;

namespace Hotel.Core.Services
{
    public class OrderService : IOrderService
    {
        private readonly Repository<Order> _orderRep;

        public OrderService(HotelAPIDBcontext dbContext)
        {
            this._orderRep = new Repository<Order>(dbContext);
        }
        public Task<Order> AddOrder(AddOrderRequest item)
        {
            throw new NotImplementedException();
        }

        public Task<Order> AddTestOrder()
        {
            throw new NotImplementedException();
        }

        public Task<Order> DeleteOrder(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return await _orderRep.GetAllItemsAsync();
        }

        public Task<Order> GetOrderById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Order> UpdateOrder(Guid id, AddOrderRequest item)
        {
            throw new NotImplementedException();
        }
    }
}

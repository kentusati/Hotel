

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
        public async Task<Order> AddOrder(AddOrderRequest item)
        {
            var newOrder = new Order()
            {
                Id = Guid.NewGuid(),
                DateOfOrder = item.DateOfOrder.ToString(),
                Status = item.Status,
                Description = item .Description,
                RoomId = Guid.Parse(item.RoomId),
                ServiceId = Guid.Parse(item.ServiceId)
            };
            await _orderRep.AddAsync(newOrder);
            await _orderRep.SaveAsync();
            return newOrder;
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

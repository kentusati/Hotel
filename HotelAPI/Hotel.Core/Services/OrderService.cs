

using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;
using Microsoft.IdentityModel.Tokens;

namespace Hotel.Core.Services
{
    public class OrderService : IOrderService
    {
        private readonly Repository<Order> _orderRep;
        private readonly Repository<Booking> _bookingRep;

        public OrderService(HotelAPIDBcontext dbContext)
        {
            this._orderRep = new Repository<Order>(dbContext);
            this._bookingRep = new Repository<Booking>(dbContext);
        }
        public async Task<Order> AddOrder(AddOrderRequest item)
        {

            



         

            var newOrder = new Order()
            {
                Id = Guid.NewGuid(),
                DateOfOrder = DateTime.Now.ToString(),
                Status = item.Status,
                UserId = Guid.Parse(item.UserId),
                ServiceId = Guid.Parse(item.ServiceId)
            };
            await _orderRep.AddAsync(newOrder);
            await _orderRep.SaveAsync();
            return newOrder;
        }

        public async Task<Order> DeleteOrder(Guid id)
        {
            var item = await _orderRep.GetByIdAsync(id);
            if (item == null) return null;
            _orderRep.Delete(item);
            await _orderRep.SaveAsync();
            return item;
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return await _orderRep.GetAllItemsAsync();
        }

        public async Task<IEnumerable<Order>> GetOrderByUserId(Guid id)
        {
            var items = await _orderRep.FindAsync(o=>o.UserId==id);
            if (items.IsNullOrEmpty()) return null;
            return items;
        }

        public async Task<Order> UpdateOrder(Guid id, AddOrderRequest item)
        {

            if (DateTime.Parse(item.DateOfOrder) < DateTime.Today)
            {
                return null;
            }

            var booking = await _orderRep.GetByIdAsync(id);
            if (booking == null) return booking;
            _orderRep.Update(booking);
            booking.DateOfOrder = item.DateOfOrder;
            await _orderRep.SaveAsync();
            return booking;
        }
    }
}

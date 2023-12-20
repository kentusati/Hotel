
using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;

namespace Hotel.Core.Services
{
    public class SelectedServiceForOrderService : ISelectedServiceForOrderService
    {
        public Task<SelectedServiceForOrder> AddSelectedServiceForOrder(AddServiceRequest item)
        {
            throw new NotImplementedException();
        }

        public Task<SelectedServiceForOrder> AddTestSelectedServiceForOrder()
        {
            throw new NotImplementedException();
        }

        public Task<SelectedServiceForOrder> DeleteSelectedServiceForOrder(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SelectedServiceForOrder>> GetAllSelectedServiceForOrders()
        {
            throw new NotImplementedException();
        }

        public Task<SelectedServiceForOrder> GetSelectedServiceForOrderById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<SelectedServiceForOrder> UpdateSelectedServiceForOrder(Guid id, AddServiceRequest item)
        {
            throw new NotImplementedException();
        }
    }
}

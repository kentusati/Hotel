
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;

namespace Hotel.Core.Interfaces
{ 
    public interface ISelectedServiceForOrderService
    {
        Task<IEnumerable<SelectedServiceForOrder>> GetAllSelectedServiceForOrders(); // получение всех объектов
        Task<SelectedServiceForOrder> GetSelectedServiceForOrderById(Guid id); // получение одного объекта по id
        
        // FIX THIS WHEN NEEDED
        Task<SelectedServiceForOrder> AddSelectedServiceForOrder(AddServiceRequest item); // создание объекта
        Task<SelectedServiceForOrder> UpdateSelectedServiceForOrder(Guid id, AddServiceRequest item); // обновление объекта
        //

        Task<SelectedServiceForOrder> DeleteSelectedServiceForOrder(Guid id); // удаление объекта по id

        Task<SelectedServiceForOrder> AddTestSelectedServiceForOrder();
    }
}

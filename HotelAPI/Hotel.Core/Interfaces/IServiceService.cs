
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;

namespace Hotel.Core.Interfaces
{
    public interface IServiceService
    {
        Task<IEnumerable<Service>> GetAllServices(); // получение всех объектов
        Task<Service> GetServiceById(Guid id); // получение одного объекта по id
        Task<Service> AddService(AddServiceRequest item); // создание объекта
        Task<Service> UpdateService(Guid id, AddServiceRequest item); // обновление объекта
        Task<Service> DeleteService(Guid id); // удаление объекта по id
    }
}

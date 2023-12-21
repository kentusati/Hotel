
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;

namespace Hotel.Core.Interfaces
{
    public interface IRoomService
    {
        Task<IEnumerable<Room>> GetAllRooms(); // получение всех объектов
        Task<Room> GetRoomById(Guid id); // получение одного объекта по id
        Task<Room> AddRoom(AddRoomRequest item); // создание объекта
        Task<Room> UpdateRoom(Guid id, AddRoomRequest item); // обновление объекта
        Task<Room> DeleteRoom(Guid id); // удаление объекта по id

    }
}

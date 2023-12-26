using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;

namespace Hotel.Core.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<Booking>> GetAllBookings(); // получение всех объектов
        Task<IEnumerable<Booking>> GetUserBookings(Guid id);
        Task<Booking> GetBookingById(Guid id); // получение одного объекта по id
        Task<Booking> AddBooking(AddBookingRequest item); // создание объекта
        Task<Booking> UpdateBooking(Guid id, AddBookingRequest item); // обновление объекта
        Task<Booking> DeleteBooking(Guid id); // удаление объекта по id

    }
}

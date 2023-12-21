using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;

namespace Hotel.Core.Services
{
    public class BookingService : IBookingService
    {
        private readonly Repository<Booking> _bookingRep;

        public BookingService(HotelAPIDBcontext dbContext)
        {
            this._bookingRep = new Repository<Booking>(dbContext);
        }

        public async Task<Booking> AddBooking(AddBookingRequest item)
        {
            var newBooking = new Booking()
            {
                Id = Guid.NewGuid(),
                StartTime = DateTime.Now.ToString(),
                EndTime = item.EndTime.ToString(),
                RoomId = item.RoomId,
                UserId = item.UserId,
                Room = item.room,
                User = item.user,
            };
            await _bookingRep.AddAsync(newBooking);
            await _bookingRep.SaveAsync();
            return newBooking;
        }

        public async Task<Booking> DeleteBooking(Guid id)
        {
            var booking = await _bookingRep.GetByIdAsync(id);
            if (booking == null) return booking;
            _bookingRep.Delete(booking);
            await _bookingRep.SaveAsync();
            return booking;
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            var bookings = await _bookingRep.GetAllItemsAsync();
            return bookings;
        }

        public async Task<Booking> GetBookingById(Guid id)
        {
            return await _bookingRep.GetByIdAsync(id);
        }

        public async Task<Booking> UpdateBooking(Guid id, AddBookingRequest item)
        {
            var booking = await _bookingRep.GetByIdAsync(id);
            if (booking == null) return booking;
            _bookingRep.Update(booking);
            booking.StartTime = item.StartTime.ToString();
            booking.EndTime = item.EndTime.ToString();
            await _bookingRep.SaveAsync();
            return booking;
        }
    }
}

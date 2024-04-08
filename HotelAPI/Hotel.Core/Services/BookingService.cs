using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;
using Microsoft.IdentityModel.Tokens;

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
            if (item.StartTime<DateTime.Today) {
                return null;
            }
            if (item.StartTime > item.EndTime){
                return null;
            }

            var newBooking = new Booking()
            {
                Id = Guid.NewGuid(),
                StartTime = item.StartTime.ToString(),
                EndTime = item.EndTime.ToString(),
                RoomId = Guid.Parse(item.RoomId),
                UserId = Guid.Parse(item.UserId)
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
            //var bookings = await _bookingRep.GetAllItemsAsync();
            var bookings = await _bookingRep.GetAllItemsAsyncWithInclude(b=> b.User, b=>b.Room);
            foreach (var book in bookings) {
                DateTime dateTime;
                DateTime.TryParse(book.StartTime, out dateTime);
                Console.WriteLine(dateTime);
                Console.WriteLine(dateTime.Month);
            }
            return bookings;
        }
        public async Task<IEnumerable<Booking>> GetUserBookings(Guid id)
        {
            var bookingsAll = await _bookingRep.GetAllItemsAsyncWithInclude(b => b.User, b => b.Room);
            List<Booking> items = new List<Booking>();
            foreach (var booking in bookingsAll)
            {
                if (booking.UserId == id) {
                    items.Add(booking);
                    Console.WriteLine(booking);
                }
            }
            if(items.IsNullOrEmpty()) return null;
            return items;
        }

        public async Task<Booking> GetBookingById(Guid id)
        {
            return await _bookingRep.GetByIdAsync(id);
        }

        public async Task<Booking> UpdateBooking(Guid id, AddBookingRequest item)
        {
            if (item.StartTime < DateTime.Today)
            {
                return null;
            }
            if (item.StartTime > item.EndTime)
            {
                return null;
            }

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

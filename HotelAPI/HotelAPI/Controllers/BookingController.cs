using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : Controller
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet("GetAllBookings")]
        public async Task<IEnumerable<Booking>> GetBookings()
        {
            return await _bookingService.GetAllBookings();
        }
        [HttpPost("AddBooking")]
        public async Task<IActionResult> AddBooking(AddBookingRequest addRequest)
        {
            var result = await _bookingService.AddBooking(addRequest);
            return Ok(result);
        }
        [HttpPut("UpdateBooking")]
        public async Task<IActionResult> UpdateBooking(string id, AddBookingRequest addRequest)
        {
            var result = await _bookingService.UpdateBooking(Guid.Parse(id), addRequest);
            return Ok(result);
        }
        [HttpDelete("DeleteBooking")]
        public async Task<IActionResult> DeleteBooking(string id)
        {
            var result = await _bookingService.DeleteBooking(Guid.Parse(id));
            return Ok(result);
        }
    }
}

using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : Controller
    {
        private readonly IBookingService _bookingService;
        private readonly IRoomService _roomService;

        public BookingController(IBookingService bookingService, IRoomService roomService)
        {
            _bookingService = bookingService;
            _roomService = roomService;
        }

        [HttpGet("GetAllBookings")]
        public async Task<IEnumerable<Booking>> GetBookings()
        {
            return await _bookingService.GetAllBookings();
        }

        [HttpGet("GetAllUserBookings/{id}")]
        public async Task<IActionResult> GetUserBookings([FromRoute]string id)
        {
            var result = await _bookingService.GetUserBookings(Guid.Parse(id));
            if (!result.IsNullOrEmpty()){
                return Ok(result);
            }   
            return Ok(null);
        }

        [HttpPost("AddBooking")]
        public async Task<IActionResult> AddBooking(AddBookingRequest addRequest)
        {
            var room =  await _roomService.GetRoomById(Guid.Parse(addRequest.RoomId));
            if (room.Available == false) return null;
            var result = await _bookingService.AddBooking(addRequest);
            if(result != null) await _roomService.UpdateRoom(Guid.Parse(addRequest.RoomId));
            return Ok(result);
        }
        [HttpPut("UpdateBooking/{id}")]
        public async Task<IActionResult> UpdateBooking([FromRoute] string id, AddBookingRequest addRequest)
        {
            var result = await _bookingService.UpdateBooking(Guid.Parse(id), addRequest);
            return Ok(result);
        }
        [HttpDelete("DeleteBooking/{id}")]
        public async Task<IActionResult> DeleteBooking([FromRoute] string id)
        {
            var result = await _bookingService.DeleteBooking(Guid.Parse(id));
            return Ok(result);
        }
    }
}

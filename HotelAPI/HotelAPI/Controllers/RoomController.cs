using Hotel.Core.Interfaces;
using Hotel.Core.Services;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : Controller
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet("GetAllRooms")]
        public async Task<IEnumerable<Room>> GetRooms()
        {
            return await _roomService.GetAllRooms();
        }
        [HttpPost("AddRoom")]
        public async Task<IActionResult> AddRoom(AddRoomRequest roomRequest)
        {
            var result = await _roomService.AddRoom(roomRequest);
            return Ok(result);
        }
        [HttpPut("UpdateRoom")]
        public async Task<IActionResult> UpdateRoom( string id, AddRoomRequest roomRequest)
        {
            var result = await _roomService.UpdateRoom(Guid.Parse(id), roomRequest);
            return Ok(result);
        }
        [HttpDelete("DeleteRoom")]
        public async Task<IActionResult> DeleteRoom(string id)
        {
            var result = await _roomService.DeleteRoom(Guid.Parse(id));
            return Ok(result);
        }
    }
}

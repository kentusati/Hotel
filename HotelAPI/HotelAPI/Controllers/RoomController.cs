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
        public async Task<IActionResult> GetRooms()
        {
            var result = await _roomService.GetAllRooms();
            return Ok(result);
        }
        [HttpGet("GetAllRooms/{id}")]
        public async Task<IActionResult> GetRoomsByTypeId([FromRoute]Guid id)
        {
            var result = await _roomService.GetAllRoomsByTypeId(id);
            return Ok(result);
        }
        [HttpGet("GetAllRoomsType")]
        public async Task<IActionResult> GetRoomsType()
        {
            var result = await _roomService.GetAllRoomsTypes();
            return Ok(result);
        }
        [HttpPost("AddRoom")]
        public async Task<IActionResult> AddRoom(AddRoomRequest roomRequest)
        {
            var result = await _roomService.AddRoom(roomRequest);
            return Ok(result);
        }
        [HttpPost("AddRoomType")]
        public async Task<IActionResult> AddRoomType(AddRoomTypeRequest roomRequest)
        {
            var result = await _roomService.AddRoomType(roomRequest);
            return Ok(result);
        }
        [HttpPut("UpdateRoom/{id}")]
        public async Task<IActionResult> UpdateRoom([FromRoute] string id, AddRoomRequest roomRequest)
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

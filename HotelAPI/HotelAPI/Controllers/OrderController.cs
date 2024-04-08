using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("GetlAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            return Ok(await _orderService.GetAllOrders());
        }
        [HttpGet("GetUserOrders/{id}")]
        public async Task<IActionResult> GetUserOrders([FromRoute]string id)
        {
            var items = await _orderService.GetOrderByUserId(Guid.Parse(id));
            if (!items.IsNullOrEmpty()) return Ok(items);
            return Ok(null);
        }

        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder(AddOrderRequest item)
        {
            Console.WriteLine();
            Console.WriteLine(item.DateOfOrder);Console.Write(item.DateOfOrder.GetType());
            Console.WriteLine(item.Status); Console.Write(item.Status.GetType());
            Console.WriteLine(item.UserId); Console.Write(item.UserId.GetType());
            Console.WriteLine(item.ServiceId); Console.Write(item.ServiceId.GetType());
            Console.WriteLine();

            var result = await _orderService.AddOrder(item);
            return Ok(result);
        }
        [HttpDelete("DeleteOrder/{id}")]
        public async Task<IActionResult> DeleteOrder([FromRoute]string id)
        {
            var result = await _orderService.DeleteOrder(Guid.Parse(id));
            return Ok(result);
        }
        [HttpPut("UpdateOrder/{id}")]
        public async Task<IActionResult> UpdateOrder([FromRoute] string id, AddOrderRequest item)
        {
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine(id);
            Console.WriteLine();
            Console.WriteLine();
            var result = await _orderService.UpdateOrder(Guid.Parse(id), item);
            return Ok(result);
        }
    }
}

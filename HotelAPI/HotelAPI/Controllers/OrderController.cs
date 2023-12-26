using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder(AddOrderRequest item)
        {
            var result = await _orderService.AddOrder(item);
            return Ok(result);
        }
    }
}

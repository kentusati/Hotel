using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.DTOs.UsersRequest;
using Hotel.Infastructure.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : Controller
    {
        private readonly IServiceService _serviceService;

        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet("GetAllServices")]
        public async Task<IActionResult> GetAllServices()
        {
            var result = await _serviceService.GetAllServices();
            return Ok(result);
        }

        [HttpPost("AddService")]
        public async Task<IActionResult> AddService(AddServiceRequest serviceRequest)
        {
            var result = await _serviceService.AddService(serviceRequest);
            return Ok(result);
        }

        [HttpPut("UpdateService")]
        public async Task<IActionResult> UpdateService(string id, AddServiceRequest serviceRequest)
        {
            var result = await _serviceService.UpdateService(Guid.Parse(id), serviceRequest);
            return Ok(result);
        }

        [HttpDelete("DeleteService")]
        public async Task<IActionResult> DeleteService(string id)
        {
            var result = _serviceService.DeleteService(Guid.Parse(id));
            return Ok(result);
        }
    }
}

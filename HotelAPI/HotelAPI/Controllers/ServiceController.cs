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

        [HttpPut("UpdateService/{id}")]
        public async Task<IActionResult> UpdateService([FromRoute] string id, AddServiceRequest serviceRequest)
        {
            var result = await _serviceService.UpdateService(Guid.Parse(id), serviceRequest);
            if (result == null) return Ok(null);
            return Ok(result);
        }

        [HttpDelete("DeleteService/{id}")]
        public async Task<IActionResult> DeleteService([FromRoute] string id)
        {
            var result = await _serviceService.DeleteService(Guid.Parse(id));
            return Ok(result);
        }
    }
}

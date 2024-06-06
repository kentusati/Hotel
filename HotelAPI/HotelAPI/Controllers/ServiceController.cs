using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.DTOs.UsersRequest;
using Hotel.Infastructure.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : Controller
    {
        private readonly IServiceService _serviceService;
        private readonly ILogger<ServiceController> _logger;

        public ServiceController(IServiceService serviceService, ILogger<ServiceController> logger)
        {
            _serviceService = serviceService;
            _logger = logger;
        }

        [HttpGet("GetAllServices")]
        public async Task<IActionResult> GetAllServices()
        {
            var result = await _serviceService.GetAllServices();
            return Ok(result);
        }

        [HttpPost("AddService")]
        public async Task<IActionResult> AddService([FromForm] string name, [FromForm] int price, [FromForm] string description, IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsFolder = Path.Combine("wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, image.FileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }
            var serviceRequest = new AddServiceRequest(){
                Name = name,
                Price = price,
                Description =description,
                ImgName = image.FileName,
            };
            var result = await _serviceService.AddService(serviceRequest);
            return Ok(result);
        }
        [HttpPost("UploadImage")]


        //--------------------------------------------------------------------------

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

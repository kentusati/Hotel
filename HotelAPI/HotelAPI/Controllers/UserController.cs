using Microsoft.AspNetCore.Mvc;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.DTOs.UsersRequest;
using Hotel.Core.Services;
using Hotel.Core.Interfaces;
using Hotel.Infastructure.Tokens;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Hotel.DataAccess.Models;


namespace Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly JWTSettings _jwtSettings;
        private readonly IOrderService _orderService;
        public UserController(IUserService userService, IOptions<JWTSettings> _options)
        {
            _userService = userService;
            _jwtSettings = _options.Value;
        }

        [HttpGet("GetAllUsers")]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _userService.GetAllUsersWithInclude();
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(AddUserRequest userRequest)
        {
            var result = await _userService.AddUser(userRequest);
            return Ok(result);
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(AuthenticationUserRequest User)
        {
            var result = await _userService.LoginAsync(User, _jwtSettings);
            if (result.IsNullOrEmpty())
            {
                return Unauthorized();
            }
            return Ok(result);
        }
        [HttpPost("AddManager")]
        public async Task<IActionResult> AddManager(AddUserRequest manager)
        {
            var result = await _userService.AddManager(manager);
            return Ok(result);
        }
        [HttpPost("AddAdmin")]
        public async Task<IActionResult> AddAdmin()
        {
            var result = await _userService.InitAdmin();
            return Ok(result);
        }

        [HttpPatch("BlockUser")]
        public async Task<IActionResult> BlockUser(string id)
        {
            var result = await _userService.BlockUser(Guid.Parse(id));
            return Ok(result);
        }
    }
}

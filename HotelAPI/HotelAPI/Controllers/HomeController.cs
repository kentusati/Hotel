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
using Microsoft.AspNetCore.Authorization;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {

        [Authorize(Roles = "Admin")]
        [HttpGet("TestRoleAdmin")]
        public IActionResult TestAdmin()
        {
            return Ok();
        }
        [Authorize]
        [HttpGet("TestAuth")]
        public IActionResult TestAuth()
        {
            return Ok();
        }

        [HttpGet("TestUnauth")]
        public IActionResult TestUnauth()
        {
            return Ok();
        }
        [Authorize(Roles = "User")]
        [HttpGet("TestRoleUser")]
        public IActionResult TestRoleUser()
        {
            return Ok();
        }


        //--------------------------------------------------------------------------
    }
}

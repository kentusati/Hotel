using Hotel.Core.Interfaces;
using Hotel.Core.Services;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService Service)
        {
            _commentService = Service;
        }

        [HttpGet("GetAllComments")]
        public async Task<IActionResult> GetComments()
        {
            return Ok(await _commentService.GetAllComments());
        }

        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment(AddCommentRequest addRequest)
        {
            var result = await _commentService.AddComment(addRequest);
            if (result == null) return NotFound();
            return Ok(result);
        }
        [HttpDelete("DeleteComment/{id}")]
        public async Task<IActionResult> DeleteComment([FromRoute] string id)
        {
            var result = _commentService.DeleteComment(Guid.Parse(id));
            return Ok(result);
        }
    }
}

using EventHorizon_API.DTOs;
using EventHorizon_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventHorizon_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet("ListUsers")]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [Authorize]
        [HttpPost("CreateUser")]
        public async Task<IActionResult> Post(UserDTO userDTO)
        {
            try
            {
                await _service.Create(userDTO);
                return Ok("Usuário cadastrado com sucesso");

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

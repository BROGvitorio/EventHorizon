using EventHorizon_API.DTOs;
using EventHorizon_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

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

        [HttpGet("ListAll")]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpGet("GetByEmail")]
        public async Task<IActionResult> Get(String userEmail) {
            return Ok(await _service.GetByEmail(userEmail));
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserDTO userDTO)
        {
            try
            {
                await _service.Create(userDTO);
                return Ok(new { message = "Usuário cadastrado com sucesso!" });

            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] String userEmail)
        {
            try
            {
                await _service.Delete(userEmail);
                return Ok(new { message = "Usuário deletado com sucesso!" });

            }
            catch (Exception e)
            {
                return NotFound(new { message = e.Message});
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UserDTO userDTO)
        {
            try
            {
                await _service.Update(userDTO);
                return Ok(new { message = "Usuário atualizado com sucesso!" });

            }
            catch (Exception e)
            {
                return NotFound(new { message = e.Message});
            }
        }
    }
}

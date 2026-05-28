using EventHorizon_API.DTOs;
using EventHorizon_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace EventHorizon_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankAccountController : ControllerBase
    {
        private readonly IBankAccountService _service;

        public BankAccountController(IBankAccountService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Post(BankAccountDTO bankAccountDTO)
        {
            try
            {
                await _service.Create(bankAccountDTO);
                return Ok(new {message = "Conta cadastrada com sucesso!"});

            } catch (Exception e)
            {
                return BadRequest(new {message = e.Message});
            }
        }

        [Authorize]
        [HttpGet("GetByOwnerId/{ownerId}")]
        public async Task<IActionResult> Get([FromRoute] int ownerId) {
            try {
                return Ok(await _service.GetByOwnerId(ownerId));
            }
            catch (Exception e) {
                return NotFound(new {message = e.Message});
            }
        }
    }
}

using EventHorizon_API.Services;
using EventHorizon_API.DTOs;
using Microsoft.AspNetCore.Mvc;

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
    }
}

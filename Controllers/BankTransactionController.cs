using EventHorizon_API.Services;
using EventHorizon_API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace EventHorizon_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankTransactionController : ControllerBase
    {
        private readonly IBankTransactionService _service;

        public BankTransactionController(IBankTransactionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpPost]
        public async Task<IActionResult> Post(BankTransactionDTO bankTransactionDTO)
        {
            try
            {
                await _service.Create(bankTransactionDTO);
                return Ok("Transação registrada com sucesso");

            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

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
        private readonly IMakeBankTransactionUseCase _usecase;

        public BankTransactionController(IBankTransactionService service, IMakeBankTransactionUseCase usecase)
        {
            _service = service;
            _usecase = usecase;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpPost]
        public async Task<IActionResult> Post(int accountId, BankTransactionDTO bankTransactionDTO)
        {
            try
            {
                await _usecase.MakeBankTransaction(accountId, bankTransactionDTO);
                return Ok("Transação registrada com sucesso");

            } catch (Exception e)
            {
                var realErrorMessage = e.InnerException != null ? e.InnerException.Message : e.Message;
                return BadRequest(new { message = realErrorMessage });
            }
        }
    }
}

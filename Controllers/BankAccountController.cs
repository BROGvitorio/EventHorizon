using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Services;
using EventHorizon_API.DTOs;
using EventHorizon_API.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
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

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpPost]
        public async Task<IActionResult> Post(BankAccountDTO bankAccountDTO)
        {
            try
            {
                await _service.Create(bankAccountDTO);
                return Ok("Livro cadastrado com sucesso");

            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

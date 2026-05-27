using EventHorizon_API.DTOs;
using EventHorizon_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace EventHorizon_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _service;

        public CompanyController(ICompanyService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(CompanyDTO companyDTO)
        {
            try
            {
                await _service.Create(companyDTO);
                return Ok(new {message = "Empresa cadastrada com sucesso."});

            }
            catch (Exception e)
            {
                var realErrorMessage = e.InnerException != null ? e.InnerException.Message : e.Message;
                return BadRequest(new { message = realErrorMessage });
            }
        }

        [Authorize]
        [HttpGet("GetByCnpj/{companyCnpj}")]
        public async Task<IActionResult> Get([FromRoute] String companyCnpj) {
            try {
                return Ok(await _service.GetByCnpj(companyCnpj));
            }
            catch (Exception e) {
                return NotFound(new {message = e.Message});
            }
        }

        [Authorize]
        [HttpGet("GetByUserId/{userId}")]
        public async Task<IActionResult> Get([FromRoute] int userId) {
            try {
                return Ok(await _service.GetByUserId(userId));
            }
            catch (Exception e) {
                return NotFound(new {message = e.Message});
            }
        }
    }
}

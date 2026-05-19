using EventHorizon_API.DTOs;
using EventHorizon_API.Services;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("ListCompanies")]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpPost("CreateCompany")]
        public async Task<IActionResult> Post(CompanyDTO companyDTO)
        {
            try
            {
                await _service.Create(companyDTO);
                return Ok("Empresa cadastrada com sucesso");

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

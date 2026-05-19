using EventHorizon_API.DTOs;
using EventHorizon_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventHorizon_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PersonController : ControllerBase
    {
        private readonly IPersonService _service;

        public PersonController(IPersonService service)
        {
            _service = service;
        }

        [HttpGet("ListPeople")]
        public async Task<IActionResult> Get() => Ok(await _service.ListAll());

        [HttpPost("CreatePerson")]
        public async Task<IActionResult> Post(PersonDTO personDTO)
        {
            try
            {
                await _service.Create(personDTO);
                return Ok("Pessoa cadastrada com sucesso");

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

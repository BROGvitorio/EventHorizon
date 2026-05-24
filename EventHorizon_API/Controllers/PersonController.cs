using EventHorizon_API.DTOs;
using EventHorizon_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

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

        [HttpGet("GetByCpf")]
        public async Task<IActionResult> Get(String personCpf) {
            try {
                return Ok(await _service.GetByCpf(personCpf));
            }
            catch (Exception e) {
                return NotFound(new {message = e.Message});
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(PersonDTO personDTO)
        {
            try
            {
                await _service.Create(personDTO);
                return Ok(new {message = "Pessoa cadastrada com sucesso"});

            }
            catch (Exception e)
            {
                var realErrorMessage = e.InnerException != null ? e.InnerException.Message : e.Message;
                return BadRequest(new { message = realErrorMessage });
            }
        }
    }
}

using EventHorizon_API.DTOs;
using EventHorizon_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EventHorizon_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _service;

        public AuthController(IConfiguration configuration, IUserService service)
        {
            _configuration = configuration;
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserDTO userLogin)
        {
            try {
                if(userLogin.Email == null || userLogin.Email == "")
                {
                    throw new Exception("Usuário não pode ser nulo!" );
                }

                if(userLogin.LoginPassword == null || userLogin.LoginPassword == "") {
                    throw new Exception("Senha não pode ser nula!");
                }

                var user = await _service.GetByEmail(userLogin.Email);

                if(user != null && user.LoginPassword == userLogin.LoginPassword)
                {
                    var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[]
                        {
                            new Claim(ClaimTypes.Name, userLogin.Email),
                            new Claim(ClaimTypes.Role, "Administrator")
                        }),
                        Expires = DateTime.UtcNow.AddHours(2),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature), 
                        Issuer = _configuration["Jwt:Issuer"],
                        Audience = _configuration["Jwt:Audience"]
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var token = tokenHandler.CreateToken(tokenDescriptor);

                    return Ok(new { 
                        token = tokenHandler.WriteToken(token),
                        message = "Login efetuado com sucesso!"
                    });
                }

                return Unauthorized(new
                {
                    message = "Usuário ou senha inválidos"
                });
            } catch (Exception e) {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}

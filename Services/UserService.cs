using EventHorizon_API.DTOs;
using EventHorizon_API.Models;
using EventHorizon_API.Repositories;

namespace EventHorizon_API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<User>> ListAll() =>
            await _repository.ListAll();

        public async Task Create(UserDTO userDTO)
        {
            if (userDTO.Email == null || userDTO.Email.Trim() == "")
            {
               throw new Exception("Seu email não pode ser nulo!");
            }

            if (userDTO.LoginPassword == null || userDTO.LoginPassword.Trim() == "")
            {
               throw new Exception("Sua senha não pode ser nula!");
            }

            userDTO.Email = userDTO.Email.Trim();
            userDTO.LoginPassword = userDTO.LoginPassword.Trim();

            if (!userDTO.Email.Contains('@')) 
            {
                throw new Exception("O seu email deve conter um domínio! Ex.: @email");
            }

           for(int i = 0; i < userDTO.Email.Length; i++)
           {
               if (!char.IsAsciiLetterOrDigit(userDTO.Email[i]) && (userDTO.Email[i] != '.') && 
                                                (userDTO.Email[i] != '_') && (userDTO.Email[i] != '@'))
               {
                    throw new Exception("Seu email deve conter apenas letras não acentuadas, dígitos, \".\" e/ou \"_\"! Tente novamente.");  
               }
           }

            User user = await _repository.GetByEmail(userDTO.Email);
            if (user != null) {
                throw new Exception("Esse usuário já está cadastrado.");
            }

            var newUser = new User
            {
                Email = userDTO.Email,
                LoginPassword = userDTO.LoginPassword
            };

            await _repository.Create(newUser);
        }

        public async Task Delete(String userEmail) {
            if (userEmail == null || userEmail == "") {
                throw new Exception("Digite um email.");
            }
            
            User user = await _repository.GetByEmail(userEmail);

            if(user != null) await _repository.Delete(user);
            else throw new Exception("Usuário não encontrado");
        }

        public async Task Update(UserDTO userDTO) {
            if (userDTO.Email == null || userDTO.Email.Trim() == "")
            {
               throw new Exception("Digite um email!");
            }

            if (userDTO.LoginPassword == null || userDTO.LoginPassword.Trim() == "")
            {
               throw new Exception("Digite uma senha!");
            }
            
            User user = await _repository.GetByEmail(userDTO.Email);

            if(user != null) {
                user.LoginPassword = userDTO.LoginPassword;
                await _repository.Update(user);
            } 
            else throw new Exception("Usuário não encontrado");
        }

        public async Task<UserDTO> GetByEmail(String userEmail)
        {
            User user = await _repository.GetByEmail(userEmail);

            if (user != null)
            {
                UserDTO userDTO = new UserDTO
                {
                    Email = user.Email,
                    LoginPassword = user.LoginPassword
                };
                return userDTO;
            }
                
            else throw new Exception("Usuário não encontrado");
        }
    }
}

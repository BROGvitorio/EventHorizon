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
            var newUser = new User
            {
                Email = userDTO.Email,
                LoginPassword = userDTO.LoginPassword
            };

            await _repository.Create(newUser);
        }
    }
}

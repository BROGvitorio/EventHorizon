using EventHorizon_API.DTOs;
using EventHorizon_API.Models;

namespace EventHorizon_API.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAll();
        Task Create(UserDTO userDTO);
    }
}

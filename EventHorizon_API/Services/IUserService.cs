using EventHorizon_API.DTOs;
using EventHorizon_API.Models;

namespace EventHorizon_API.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAll();
        Task Create(UserDTO userDTO);
        Task Delete(String userEmail);
        Task Update(UserDTO userDTO);
        Task<UserDTO> GetByEmail(String userEmail);
    }
}

using EventHorizon_API.DTOs;
using EventHorizon_API.Models;

namespace EventHorizon_API.Services
{
    public interface IUserService
    {
        Task Create(UserDTO userDTO);
        Task Delete(String userEmail);
        Task Update(UserDTO userDTO);
        Task<UserDTO> GetByEmail(String userEmail);
        Task<int> GetUserId(String userEmail);
    }
}

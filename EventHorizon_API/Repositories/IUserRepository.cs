using EventHorizon_API.Models;

namespace EventHorizon_API.Repositories
{
    public interface IUserRepository
    {
        Task Create(User newUser);
        Task Update(User updatedUser);
        Task Delete(User user);
        Task<User> GetByEmail(String userEmail);
    }
}

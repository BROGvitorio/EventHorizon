using EventHorizon_API.Models;
using EventHorizon_API.Models.BankAccounts;

namespace EventHorizon_API.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> ListAll();
        Task Create(User newUser);
        Task Update(User updatedUser);
        Task Delete(User user);
    }
}

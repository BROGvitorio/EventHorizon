using EventHorizon_API.Models;
using EventHorizon_API.Models.BankAccounts;

namespace EventHorizon_API.Repositories
{
    public interface IBankAccountRepository
    {
        Task Create(BankAccount newAccount);
        Task<List<BankAccount>> GetByOwnerId(int ownerId);
        Task Update(BankAccount updatedAccount);
        Task Delete(BankAccount bankAccount);
        Task<BankAccount> GetById(int accountId);
    }
}
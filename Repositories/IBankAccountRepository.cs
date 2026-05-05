using EventHorizon_API.Models;
using EventHorizon_API.Models.BankAccounts;

namespace EventHorizon_API.Repositories
{
    public interface IBankAccountRepository
    {
        Task<IEnumerable<BankAccount>> ListAll();
        Task Add(BankAccount newAccount);
        Task Update(BankAccount updatedAccount);
        Task Delete(BankAccount bankAccount);
    }
}
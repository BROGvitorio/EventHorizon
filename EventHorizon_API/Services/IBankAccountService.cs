using EventHorizon_API.DTOs;
using EventHorizon_API.Models.BankAccounts;

namespace EventHorizon_API.Services
{
    public interface IBankAccountService
    {
        Task<IEnumerable<BankAccount>> ListAll();
        Task Create(BankAccountDTO bankAccountDTO);
    }
}

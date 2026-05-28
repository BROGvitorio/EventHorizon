using EventHorizon_API.DTOs;
using EventHorizon_API.Models.BankAccounts;

namespace EventHorizon_API.Services
{
    public interface IBankAccountService
    {
        Task Create(BankAccountDTO bankAccountDTO);
        Task<List<BankAccount>> GetByOwnerId(int ownerId);
    }
}

using EventHorizon_API.DTOs;
using EventHorizon_API.Models;
using EventHorizon_API.Models.BankAccounts;

namespace EventHorizon_API.Services
{
    public interface IBankTransactionService
    {
        Task<IEnumerable<BankTransaction>> ListAll();
        Task Create(BankTransactionDTO bankTransactionDTO);
    }
}

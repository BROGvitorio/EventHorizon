using EventHorizon_API.Repositories;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models;
using EventHorizon_API.DTOs;

namespace EventHorizon_API.Services
{
    public interface IMakeBankTransactionUseCase
    {
        Task<BankTransactionDTO> MakeBankTransaction (int accountId, BankTransactionDTO transactionDTO);
    }
}

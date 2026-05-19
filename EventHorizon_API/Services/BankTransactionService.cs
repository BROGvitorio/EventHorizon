using EventHorizon_API.DTOs;
using EventHorizon_API.Models;
using EventHorizon_API.Repositories;

namespace EventHorizon_API.Services
{
    public class BankTransactionService : IBankTransactionService
    {
        private readonly IBankTransactionRepository _repository;

        public BankTransactionService(IBankTransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<BankTransaction>> ListAll() =>
            await _repository.ListAll();

        public async Task Create(BankTransactionDTO bankTransactionDTO)
        {
            var newTransaction = new BankTransaction
            {
                AccountId = bankTransactionDTO.AccountId,
                Category = bankTransactionDTO.Category,
                Amount = bankTransactionDTO.Amount
            };

            await _repository.Create(newTransaction);
        }
    }
}

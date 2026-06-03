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
    }
}

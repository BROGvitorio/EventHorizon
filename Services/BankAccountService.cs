using EventHorizon_API.Repositories;
using EventHorizon_API.Models;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.DTOs;

namespace EventHorizon_API.Services
{
    public class BankAccountService : IBankAccountService
    {
        private readonly IBankAccountRepository _repository;

        public BankAccountService(IBankAccountRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<BankAccount>> ListAll() =>
            await _repository.ListAll();

        public async Task Create(BankAccountDTO bankAccountDTO)
        {
            var newAccount = new CheckingAccount
            {
                OwnerId = bankAccountDTO.OwnerId,
                Balance = bankAccountDTO.Balance,
            };

            await _repository.Add(newAccount);
        }
    }
}

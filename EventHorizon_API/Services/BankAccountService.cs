using EventHorizon_API.Repositories;
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

        public async Task Create(BankAccountDTO bankAccountDTO)
        {
            if (string.IsNullOrEmpty(bankAccountDTO.Category)) {
                throw new Exception("Uma conta bancária precisa de uma categoria.");
            }

            bankAccountDTO.Category = bankAccountDTO.Category.ToUpper().Trim();

            BankAccount newAccount;
            switch (bankAccountDTO.Category) {
                case "BUSINESS":
                    newAccount = new BusinessAccount(bankAccountDTO.OwnerId, bankAccountDTO.OwnerMonthlyIncome);
                    break;
                case "CHECKING":
                    newAccount = new CheckingAccount(bankAccountDTO.OwnerId, bankAccountDTO.OwnerMonthlyIncome);
                    break;
                case "SAVING": 
                    newAccount = new SavingAccount(bankAccountDTO.OwnerId, bankAccountDTO.OwnerMonthlyIncome);
                    break;
                default:
                    throw new Exception("Categoria de conta bancária inválida.");
            }

            await _repository.Create(newAccount);
        }
    }
}

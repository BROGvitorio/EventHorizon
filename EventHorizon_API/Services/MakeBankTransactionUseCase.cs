using EventHorizon_API.Repositories;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models;
using EventHorizon_API.DTOs;

namespace EventHorizon_API.Services
{
    public class MakeBankTransactionUseCase : IMakeBankTransactionUseCase
    {
        private readonly IBankAccountRepository _accountRepository;
        private readonly IBankTransactionRepository _transactionRepository;

        public MakeBankTransactionUseCase(IBankAccountRepository accountRepository, IBankTransactionRepository transactionRepository)
        {
            _accountRepository = accountRepository;
            _transactionRepository = transactionRepository;
        }

        public async Task<BankTransactionDTO> MakeBankTransaction (int accountId, BankTransactionDTO transactionDTO) {
            var account = await _accountRepository.GetById(accountId);

            if (account == null)
                throw new Exception("Conta de origem inválida.");

            if (transactionDTO.Amount <= 0) {
                throw new Exception("Valor inválido.");
            }

            TransactionCategory categoryEnum;
            
            transactionDTO.Category = transactionDTO.Category.ToUpper();
            decimal totalAmount;

            switch (transactionDTO.Category) {
                case "WITHDRAWAL":
                    totalAmount = account.Withdrawal(transactionDTO.Amount);
                    categoryEnum = TransactionCategory.Withdrawal;
                    break;

                case "DEPOSIT":
                    totalAmount = account.Deposit(transactionDTO.Amount);
                    categoryEnum = TransactionCategory.Deposit;
                    break;
                
                default:
                    throw new Exception("Categoria de transação inválida");
            }

            var newTransaction = new BankTransaction {
                AccountId = account.Id,
                Category = categoryEnum,
                Amount = totalAmount,
                Date = transactionDTO.Date
            };

            await _accountRepository.Update(account);
            await _transactionRepository.Create(newTransaction);

            return new BankTransactionDTO {
                Category = transactionDTO.Category,
                Amount = totalAmount,
                Date = transactionDTO.Date
            };
        }
    }
}

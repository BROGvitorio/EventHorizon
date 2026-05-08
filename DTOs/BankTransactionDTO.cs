using static EventHorizon_API.Models.BankTransaction;

namespace EventHorizon_API.DTOs
{
    public class BankTransactionDTO
    {
        public int AccountId { get; set; }

        public TransactionCategory Category { get; set; }
        public decimal Amount { get; set; }
    }
}

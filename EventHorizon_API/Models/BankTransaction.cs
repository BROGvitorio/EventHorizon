namespace EventHorizon_API.Models
{
    public class BankTransaction
    {
        public enum TransactionCategory
        {
            Deposit = 0,
            LoanPayment,
            LoanRequest,
            Transfer,
            Withdrawal
        }

        public int Id { get; set; }
        public int AccountId { get; set; }

        public TransactionCategory Category { get; set; }
        public decimal Amount { get; set; }
    }
}

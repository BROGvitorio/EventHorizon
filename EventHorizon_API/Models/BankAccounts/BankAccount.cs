namespace EventHorizon_API.Models.BankAccounts
{
    public abstract class BankAccount
    {
        public enum AccountCategory{ 
            Business = 0,
            Checking = 1,
            Saving = 2
        }

        public int Id { get; set; }
        public AccountCategory Category { get; set; }
        public decimal Balance { get; set; }

        public decimal LoanLimit { get; set; }
        public decimal LoanDebt { get; set; }
        public decimal WithdrawalTax { get; set; } = 0;

        public int OwnerId { get; set; }
        public ICollection<BankTransaction> Transactions { get; set; }

        protected BankAccount () { }

        public BankAccount (int ownerId)
        {
            OwnerId = ownerId;
        }
    }
}

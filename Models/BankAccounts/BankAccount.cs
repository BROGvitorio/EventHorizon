namespace EventHorizon_API.Models.BankAccounts
{
    public abstract class BankAccount
    {
        public enum AccountCategory{ 
            business = 0,
            checking = 1,
            saving = 2
        }

        public AccountCategory Category { get; set; }
        public int Id { get; set; }
        public decimal Balance { get; set; }

        public decimal LoanLimit { get; set; }
        public decimal LoanDebt { get; set; }
        public decimal WithdrawalTax { get; set; } = 0;

        public int OwnerId { get; set; }
        //public int UserId { get; protected set; }

        protected BankAccount () { }

        public BankAccount (int ownerId)
        {
            OwnerId = ownerId;
        }
    }
}

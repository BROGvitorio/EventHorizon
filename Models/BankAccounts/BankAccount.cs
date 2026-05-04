namespace EventHorizon_API.Models.BankAccounts
{
    public abstract class BankAccount
    {
        public enum AccountCategory{ 
            business = 0,
            checking = 1,
            saving = 2
        }

        public AccountCategory Category { get; protected set; }
        public int Id { get; protected set; }
        public decimal Balance { get; protected set; }

        public decimal LoanLimit { get; protected set; }
        public decimal LoanDebt { get; protected set; }
        public decimal WithdrawalTax { get; protected set; } = 0;

        public int OwnerId { get; protected set; }
        //public int UserId { get; protected set; }

        protected BankAccount () { }

        public BankAccount (int ownerId)
        {
            OwnerId = ownerId;
        }
    }
}

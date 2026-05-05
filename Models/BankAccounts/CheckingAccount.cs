namespace EventHorizon_API.Models.BankAccounts
{
    public class CheckingAccount : BankAccount
    {
        public CheckingAccount () { }

        public CheckingAccount (int ownerId) : base (ownerId)
        {
            WithdrawalTax = 0.05m;
            Category = AccountCategory.checking;
            // Cálculo do limite de empréstimo MI * 0.3
        }
    }
}

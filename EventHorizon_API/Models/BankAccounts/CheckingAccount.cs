namespace EventHorizon_API.Models.BankAccounts
{
    public class CheckingAccount : BankAccount
    {
        public CheckingAccount () { }

        public CheckingAccount (int ownerId, decimal monthlyIncome) : base(ownerId, monthlyIncome)
        {
            WithdrawalTax = 0.05m;
            Category = AccountCategory.Checking;
            LoanLimit = 0.3m * monthlyIncome;
        }
    }
}

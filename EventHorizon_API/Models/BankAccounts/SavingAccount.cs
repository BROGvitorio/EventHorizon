namespace EventHorizon_API.Models.BankAccounts
{
    public class SavingAccount : BankAccount
    {
        private SavingAccount () { }
        public SavingAccount (int ownerId, decimal monthlyIncome) : base(ownerId, monthlyIncome)
        {
            Category = AccountCategory.Saving;
            LoanLimit = 0.3m * monthlyIncome;
        }
    }
}

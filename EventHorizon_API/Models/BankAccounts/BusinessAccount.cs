namespace EventHorizon_API.Models.BankAccounts
{
    public class BusinessAccount : BankAccount
    {
        private BusinessAccount () { }

        public BusinessAccount(int ownerId, decimal monthlyIncome) : base(ownerId, monthlyIncome)
        {
            Category = AccountCategory.Business;
            LoanLimit = 0.3m * monthlyIncome;
        }
    }
}

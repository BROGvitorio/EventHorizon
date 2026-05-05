namespace EventHorizon_API.Models.BankAccounts
{
    public class BusinessAccount : BankAccount
    {
        private BusinessAccount () { }

        public BusinessAccount(int ownerId) : base(ownerId)
        {
            Category = AccountCategory.business;
            // Cálculo do limite de empréstimo MI * 0.5
        }
    }
}

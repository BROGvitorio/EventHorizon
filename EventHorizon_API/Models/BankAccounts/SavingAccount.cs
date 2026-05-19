namespace EventHorizon_API.Models.BankAccounts
{
    public class SavingAccount : BankAccount
    {
        private SavingAccount () { }
        public SavingAccount(int ownerId) : base(ownerId)
        {
            Category = AccountCategory.Saving;
            // Cálculo do limite de empréstimo MI * 0.3
        }
    }
}

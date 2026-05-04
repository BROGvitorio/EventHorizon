namespace EventHorizon_API.Models.BankAccounts
{
    public class Saving : BankAccount
    {
        private Saving () { }
        public Saving(int ownerId) : base(ownerId)
        {
            Category = AccountCategory.saving;
            // Cálculo do limite de empréstimo MI * 0.3
        }
    }
}

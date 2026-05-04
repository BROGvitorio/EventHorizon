namespace EventHorizon_API.Models.BankAccounts
{
    public class Business : BankAccount
    {
        private Business () { }

        public Business(int ownerId) : base(ownerId)
        {
            Category = AccountCategory.business;
            // Cálculo do limite de empréstimo MI * 0.5
        }
    }
}

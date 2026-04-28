using EventHorizon_API.Models.BankAccounts;

namespace EventHorizon_API.Models.Owners
{
    public abstract class Owner
    {
        public int Id { get; private set; }
        public int UserId { get; private set; }

        public ICollection<BankAccount> BankAccounts { get; protected set; } = new List<BankAccount>();

        //protected Owner () { }

        protected Owner (int userId)
        {
            UserId = userId;
        }
    }
}

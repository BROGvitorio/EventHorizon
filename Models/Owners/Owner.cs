using EventHorizon_API.Models.BankAccounts;

namespace EventHorizon_API.Models.Owners
{
    public abstract class Owner
    {
        public enum OwnerType
        {
            person = 0,
            company = 1
        }
        public int Id { get; private set; }

        public OwnerType Type { get; protected set; }
        public int UserId { get; private set; }

        public ICollection<BankAccount> BankAccounts { get; protected set; } = new List<BankAccount>();

        //protected Owner () { }

        protected Owner (int userId, OwnerType ownerType)
        {
            UserId = userId;
            Type = ownerType;
        }
    }
}

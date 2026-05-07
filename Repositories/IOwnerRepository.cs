using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Repositories
{
    public interface IOwnerRepository
    {
        Task Create(Owner newOwner);
        Task Delete(Owner owner);
        //Task<IEnumerable<Owner>> ListAll();
        
        Task<IEnumerable<Person>> ListAllPeople();
        Task<IEnumerable<Company>> ListAllCompanies();
    }
}
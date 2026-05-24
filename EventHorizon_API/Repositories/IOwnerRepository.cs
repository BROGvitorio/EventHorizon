using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Repositories
{
    public interface IOwnerRepository
    {
        Task Create(Owner newOwner);
        Task Delete(Owner owner);
        
        Task<IEnumerable<Company>> ListAllCompanies();

        Task<Person> GetByCpf(String personCpf);
        Task<Company> GetByCnpj(String companyCnpj);
    }
}
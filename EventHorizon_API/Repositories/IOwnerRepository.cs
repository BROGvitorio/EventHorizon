using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Repositories
{
    public interface IOwnerRepository
    {
        Task Create(Owner newOwner);
        Task Delete(Owner owner);

        Task<Person> GetByCpf(String personCpf);
        Task<Company> GetByCnpj(String companyCnpj);

        Task<Person> GetPersonByUserId(int userId);
        Task<List<Company>> GetCompaniesByUserId(int userId);
    }
}
using EventHorizon_API.DTOs;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Services
{
    public interface ICompanyService
    {
        Task<IEnumerable<Company>> ListAll();
        Task Create(CompanyDTO personDTO);
    }
}

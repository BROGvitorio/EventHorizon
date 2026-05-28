using EventHorizon_API.DTOs;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Services
{
    public interface ICompanyService
    {
        Task Create(CompanyDTO personDTO);
        Task<Company> GetByCnpj(String companyCnpj);
        Task<List<CompanyDTO>> GetByUserId(int userId);
    }
}

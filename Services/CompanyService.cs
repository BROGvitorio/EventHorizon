using EventHorizon_API.Repositories;
using EventHorizon_API.DTOs;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IOwnerRepository _repository;

        public CompanyService(IOwnerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Company>> ListAll() =>
            await _repository.ListAllCompanies();

        public async Task Create(CompanyDTO companyDTO)
        {
            var newCompany = new Company
            {
                UserId = companyDTO.UserId,

                Cnpj = companyDTO.Cnpj,
                FantasyName = companyDTO.FantasyName,
                MonthlyIncome = companyDTO.MonthlyIncome
            };

            await _repository.Create(newCompany);
        }
    }
}

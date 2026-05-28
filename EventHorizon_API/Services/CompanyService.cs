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

        public async Task<Company> GetByCnpj(String companyCnpj) {
            Company company = await _repository.GetByCnpj(companyCnpj);

            if (company != null) {
                return company;
            }
                
            throw new Exception("Cadastro PJ não encontrado.");
        }

        public async Task<List<CompanyDTO>> GetByUserId(int userId) {
            List<Company> companies = await _repository.GetCompaniesByUserId(userId);

            List<CompanyDTO> companiesDTO = new List<CompanyDTO>();

            if (companies.Count != 0) 
            {
                foreach (Company c in companies) {
                    CompanyDTO companyDTO = new CompanyDTO {
                        UserId = c.UserId,
                        Cnpj = c.Cnpj,
                        FantasyName = c.FantasyName,
                        MonthlyIncome = c.MonthlyIncome
                    };
                    companiesDTO.Add(companyDTO);
                }

                return companiesDTO;
            }
            else   
                throw new Exception("Esse usuário não possui cadastro PJ.");
        }

        public async Task Create(CompanyDTO companyDTO)
        {
            if (companyDTO.Cnpj.Length != 14)
                throw new Exception("O CNPJ deve conter 14 dígitos.");

            if (companyDTO.MonthlyIncome <= 0)
                throw new Exception("Renda mensal inválida.");

            Company company = await _repository.GetByCnpj(companyDTO.Cnpj);
            if (company != null) {
                throw new Exception("Esse CNPJ já está cadastrado.");
            }

            List<Company> companies = await _repository.GetCompaniesByUserId(companyDTO.UserId);
            if (companies.Count > 1) {
                throw new Exception("Esse usuário atingiu o limite de contas empresariais.");
            }

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

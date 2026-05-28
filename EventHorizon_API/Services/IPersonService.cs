using EventHorizon_API.DTOs;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Services
{
    public interface IPersonService
    {
        Task Create(PersonDTO personDTO);
        Task<Person> GetByCpf(String personCpf);
        Task<PersonDTO> GetByUserId(int userId);
    }
}

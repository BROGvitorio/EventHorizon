using EventHorizon_API.DTOs;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Services
{
    public interface IPersonService
    {
        Task Create(PersonDTO personDTO);
        Task<PersonDTO> GetByCpf(String personCpf);
    }
}

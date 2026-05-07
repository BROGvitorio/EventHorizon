using EventHorizon_API.Repositories;
using EventHorizon_API.Models;
using EventHorizon_API.Models.BankAccounts;
using EventHorizon_API.DTOs;
using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Services
{
    public class PersonService : IPersonService
    {
        private readonly IOwnerRepository _repository;

        public PersonService(IOwnerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Person>> ListAll() =>
            await _repository.ListAllPeople();

        public async Task Create(PersonDTO personDTO)
        {
            var newPerson = new Person
            {
                UserId = personDTO.UserId,

                Cpf = personDTO.Cpf,
                FullName = personDTO.FullName,
                BirthDate = personDTO.BirthDate,
                Salary = personDTO.Salary
            };

            await _repository.Create(newPerson);
        }
    }
}

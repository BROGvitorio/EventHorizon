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

        public async Task<PersonDTO> GetByCpf(String personCpf) {
            Person person = await _repository.GetByCpf(personCpf);

            if (person != null) {
                PersonDTO personDTO = new PersonDTO {
                    UserId = person.UserId,
                    Cpf = person.Cpf,
                    FullName = person.FullName,
                    BirthDate = person.BirthDate,
                    Salary = person.Salary
                };
                return personDTO;
            }
                
            throw new Exception("Cadastro PF não encontrado");
        }
        
        public async Task Create(PersonDTO personDTO)
        {
            if (personDTO.Cpf.Length != 11)
                throw new Exception("O CPF deve conter 11 dígitos.");


            if (personDTO.BirthDate > DateOnly.FromDateTime(DateTime.Now) ||
                personDTO.BirthDate < new DateOnly(1906, 01, 01)
            )
                throw new Exception("Data de nascimento inválida");
            
            if (personDTO.BirthDate > DateOnly.FromDateTime((DateTime.Now).AddYears(-18)))
                throw new Exception("Você deve ser maior de idade para abrir uma conta");

            Person person = await _repository.GetByCpf(personDTO.Cpf);
            if (person != null) {
                throw new Exception("Esse CPF já está cadastrado");
            }

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

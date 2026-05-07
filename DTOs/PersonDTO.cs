using System.ComponentModel.DataAnnotations;

namespace EventHorizon_API.DTOs
{
    public class PersonDTO
    {
        public int UserId { get; set; }

        public string Cpf { get; set; }
        public string FullName { get; set; }
        public DateOnly BirthDate { get; set; }
        public decimal Salary { get; set; }

    }
}

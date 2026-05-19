using System.ComponentModel.DataAnnotations;

namespace EventHorizon_API.DTOs
{
    public class BankAccountDTO
    {
        [Required(ErrorMessage = "O id do titular é obrigatório")]
        public int OwnerId { get; set; }

        public decimal Balance { get; set; }

    }
}

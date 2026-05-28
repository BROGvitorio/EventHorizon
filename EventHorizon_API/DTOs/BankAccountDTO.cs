using System.ComponentModel.DataAnnotations;

namespace EventHorizon_API.DTOs
{
    public class BankAccountDTO
    {
        public int OwnerId { get; set; }
        public decimal OwnerMonthlyIncome { get; set; }
        public decimal Balance { get; set; }

        public string Category { get; set; }
    }
}

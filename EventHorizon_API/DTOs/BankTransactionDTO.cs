namespace EventHorizon_API.DTOs
{
    public class BankTransactionDTO
    {
        public string Category { get; set; }
        public decimal Amount { get; set; }
        public DateOnly Date { get; set; }
    }
}

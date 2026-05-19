using EventHorizon_API.Models;
using System.ComponentModel.DataAnnotations;

namespace EventHorizon_API.DTOs
{
    public class CompanyDTO
    {
        public int UserId { get; set; }

        public string Cnpj { get; set; }
        public string FantasyName { get; set; }
        public decimal MonthlyIncome { get; set; }
    }
}

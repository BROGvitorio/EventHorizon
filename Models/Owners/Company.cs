namespace EventHorizon_API.Models.Owners
{
    public class Company : Owner
    {
        public string Cnpj { get; set; }
        public string FantasyName { get; set; }
        public decimal MonthlyIncome { get; set; }

        public Company () { }

        public Company(int userId, string cnpj, string fantasyName, decimal monthlyIncome) : base(userId) {
            Cnpj = cnpj;
            FantasyName = fantasyName;
            MonthlyIncome = monthlyIncome;
        }
    }
}

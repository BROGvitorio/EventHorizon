namespace EventHorizon_API.Models.Owners
{
    public class Company : Owner
    {
        public string Cnpj { get; private set; }
        public string FantasyName { get; private set; }
        public decimal MonthlyIncome { get; private set; }

        //private Company () { }

        public Company(int userId, string cnpj, string fantasyName, decimal monthlyIncome) : base(userId) {
            Cnpj = cnpj;
            FantasyName = fantasyName;
            MonthlyIncome = monthlyIncome;
        }
    }
}

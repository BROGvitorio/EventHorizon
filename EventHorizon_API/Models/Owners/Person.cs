namespace EventHorizon_API.Models.Owners
{
    public class Person: Owner
    {
        public string Cpf { get; set; }
        public string FullName { get; set; }
        public DateOnly BirthDate { get; set; }
        public decimal Salary { get; set; }

        public Person () { }

        public Person (int userId, string cpf, string fullName, DateOnly birthDate, decimal salary) : base (userId) {
            Cpf = cpf;
            FullName = fullName;
            BirthDate = birthDate;
            Salary = salary;
        }
    }
}

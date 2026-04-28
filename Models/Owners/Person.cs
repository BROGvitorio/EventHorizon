namespace EventHorizon_API.Models.Owners
{
    public class Person: Owner
    {
        public string Cpf { get; private set; }
        public string FullName { get; private set; }
        public DateOnly BirthDate { get; private set; }
        public decimal Salary { get; private set; }

        //private Person () { }

        public Person (int userId, string cpf, string fullName, DateOnly birthDate, decimal salary) : base (userId) {
            Cpf = cpf;
            FullName = fullName;
            BirthDate = birthDate;
            Salary = salary;
        }
    }
}

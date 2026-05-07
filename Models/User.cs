using EventHorizon_API.Models.Owners;

namespace EventHorizon_API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string LoginPassword { get; set; }

        public ICollection<Owner> Profiles { get; set; }
    }
}

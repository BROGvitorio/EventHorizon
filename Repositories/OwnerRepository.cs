using EventHorizon_API.Data;
using EventHorizon_API.Models.Owners;
using Microsoft.EntityFrameworkCore;

namespace EventHorizon_API.Repositories
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly AppDbContext _context;

        public OwnerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Create(Owner newOwner)
        {
            await _context.Owners.AddAsync(newOwner);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Owner owner)
        {
            _context.Owners.Remove(owner);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Person>> ListAllPeople()
        {
            return await _context.People.ToListAsync();
        }
        public async Task<IEnumerable<Company>> ListAllCompanies()
        {
            return await _context.Companies.ToListAsync();
        }
    }
}

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

        public async Task<Person> GetByCpf(String personCpf)
        {
            return await _context.People.FirstOrDefaultAsync(p => p.Cpf == personCpf);
        }

        public async Task<Company> GetByCnpj(String companyCnpj)
        {
            return await _context.Companies.FirstOrDefaultAsync(c => c.Cnpj == companyCnpj);
        }

        public async Task<Person> GetPersonByUserId(int userId)
        {
            return await _context.People.FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<List<Company>> GetCompaniesByUserId(int userId)
        {
            return await _context.Companies
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }
    }
}

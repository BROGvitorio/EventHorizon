using EventHorizon_API.Data;
using EventHorizon_API.Models.BankAccounts;
using Microsoft.EntityFrameworkCore;

namespace EventHorizon_API.Repositories
{
    public class BankAccountRepository : IBankAccountRepository
    {
        private readonly AppDbContext _context;

        public BankAccountRepository (AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BankAccount>> ListAll()
        {
            return await _context.BankAccounts.ToListAsync();
        }

        public async Task Create(BankAccount newAccount)
        {
            await _context.BankAccounts.AddAsync(newAccount);
            await _context.SaveChangesAsync();
        }

        public async Task Update(BankAccount updatedAccount)
        {
            _context.BankAccounts.Update(updatedAccount);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(BankAccount account)
        {
            _context.BankAccounts.Remove(account);
            await _context.SaveChangesAsync();
        }
    }
}

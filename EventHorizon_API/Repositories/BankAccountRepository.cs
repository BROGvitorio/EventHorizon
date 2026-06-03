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

        public async Task<List<BankAccount>> GetByOwnerId(int ownerId)
        {
            return await _context.BankAccounts
                .Where(ba => ba.OwnerId == ownerId)
                .ToListAsync();
        }

        public async Task Delete(BankAccount account)
        {
            _context.BankAccounts.Remove(account);
            await _context.SaveChangesAsync();
        }

        public async Task<BankAccount> GetById(int accountId)
        {
            return await _context.BankAccounts.FirstOrDefaultAsync(ba => ba.Id == accountId);
        }
    }
}

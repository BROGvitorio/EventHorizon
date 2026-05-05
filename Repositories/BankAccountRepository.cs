using EventHorizon_API.Data;
using EventHorizon_API.Models;
using EventHorizon_API.Models.BankAccounts;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace EventHorizon_API.Repositories
{
    //conexão

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

        public async Task Add(BankAccount newAccount)
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
            _context.BankAccounts.ExecuteDelete();
            await _context.SaveChangesAsync();
        }
    }
}

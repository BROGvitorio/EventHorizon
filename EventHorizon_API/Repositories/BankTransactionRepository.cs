using EventHorizon_API.Data;
using EventHorizon_API.Models;
using Microsoft.EntityFrameworkCore;

namespace EventHorizon_API.Repositories
{
    public class BankTransactionRepository : IBankTransactionRepository
    {
        private readonly AppDbContext _context;

        public BankTransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BankTransaction>> ListAll()
        {
            return await _context.Transactions.ToListAsync();
        }

        public async Task Create(BankTransaction newTransaction)
        {
            await _context.Transactions.AddAsync(newTransaction);
            await _context.SaveChangesAsync();
        }

        public async Task Update(BankTransaction updatedTransaction)
        {
            _context.Transactions.Update(updatedTransaction);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(BankTransaction transaction)
        {
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
        }
    }
}

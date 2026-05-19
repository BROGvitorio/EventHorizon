using EventHorizon_API.Data;
using EventHorizon_API.Models;

namespace EventHorizon_API.Repositories
{
    public interface IBankTransactionRepository
    {
        Task<IEnumerable<BankTransaction>> ListAll();
        Task Create(BankTransaction newTransaction);
        Task Update(BankTransaction updatedTransaction);
        Task Delete(BankTransaction transaction);
    }
}

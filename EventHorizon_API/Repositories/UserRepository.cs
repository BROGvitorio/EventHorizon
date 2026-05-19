using EventHorizon_API.Data;
using EventHorizon_API.Models;
using EventHorizon_API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EventHorizon_API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> ListAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task Create(User newUser)
        {
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
        }

        public async Task Update(User updatedUser)
        {
            _context.Users.Update(updatedUser);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetByEmail(String userEmail)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
        }
    }
}

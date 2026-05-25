using CoreGymClub.Api.Data;
using CoreGymClub.Api.Interfaces;
using CoreGymClub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreGymClub.Api.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context) => _context = context;

    public async Task<User?> GetByEmailAsync(string email) =>
        await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email.ToLower());

    public async Task<User?> GetByIdAsync(int id) =>
        await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);

    public async Task<IReadOnlyList<User>> GetAllMembersAsync() =>
        await _context.Users
            .Include(u => u.Role)
            .Where(u => u.Role.Name == RoleNames.Member)
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync();

    public async Task AddAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> EmailExistsAsync(string email) =>
        await _context.Users.AnyAsync(u => u.Email == email.ToLower());
}

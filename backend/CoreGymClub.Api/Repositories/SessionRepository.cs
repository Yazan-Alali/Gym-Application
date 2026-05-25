using CoreGymClub.Api.Data;
using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Interfaces;
using CoreGymClub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreGymClub.Api.Repositories;

public class SessionRepository : ISessionRepository
{
    private readonly ApplicationDbContext _context;

    public SessionRepository(ApplicationDbContext context) => _context = context;

    public async Task<GymSession?> GetByIdAsync(int id) =>
        await _context.Sessions.FirstOrDefaultAsync(s => s.Id == id);

    public async Task<(IReadOnlyList<GymSession> Items, int Total)> GetFilteredAsync(SessionFilterParams filter)
    {
        var query = _context.Sessions.AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter.Search))
        {
            var search = filter.Search.ToLower();
            query = query.Where(s =>
                s.Title.ToLower().Contains(search) ||
                s.TrainerName.ToLower().Contains(search) ||
                s.Category.ToLower().Contains(search) ||
                s.Description.ToLower().Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(filter.Category))
            query = query.Where(s => s.Category == filter.Category);

        if (filter.From.HasValue)
            query = query.Where(s => s.StartTime >= filter.From.Value);

        if (filter.To.HasValue)
            query = query.Where(s => s.StartTime <= filter.To.Value);

        if (filter.OnlyAvailable == true)
            query = query.Where(s => s.AvailableSpots > 0);

        if (!filter.IncludeInactive)
            query = query.Where(s => s.IsActive);

        var total = await query.CountAsync();
        var items = await query
            .OrderBy(s => s.StartTime)
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();

        return (items, total);
    }

    public async Task AddAsync(GymSession session)
    {
        _context.Sessions.Add(session);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(GymSession session)
    {
        _context.Sessions.Update(session);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(GymSession session)
    {
        _context.Sessions.Remove(session);
        await _context.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<string>> GetCategoriesAsync() =>
        await _context.Sessions.Select(s => s.Category).Distinct().OrderBy(c => c).ToListAsync();
}

using CoreGymClub.Api.Data;
using CoreGymClub.Api.Interfaces;
using CoreGymClub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreGymClub.Api.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly ApplicationDbContext _context;

    public BookingRepository(ApplicationDbContext context) => _context = context;

    public async Task<Booking?> GetByIdAsync(int id) =>
        await _context.Bookings
            .Include(b => b.Session)
            .Include(b => b.User)
            .ThenInclude(u => u.Role)
            .FirstOrDefaultAsync(b => b.Id == id);

    public async Task<bool> HasActiveBookingAsync(int userId, int sessionId) =>
        await _context.Bookings.AnyAsync(b =>
            b.UserId == userId &&
            b.SessionId == sessionId &&
            b.Status == BookingStatus.Confirmed);

    public async Task AddAsync(Booking booking)
    {
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Booking booking)
    {
        _context.Bookings.Update(booking);
        await _context.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<Booking>> GetUserBookingsAsync(int userId, bool upcomingOnly)
    {
        var query = _context.Bookings
            .Include(b => b.Session)
            .Where(b => b.UserId == userId);

        if (upcomingOnly)
            query = query.Where(b => b.Status == BookingStatus.Confirmed && b.Session.StartTime >= DateTime.UtcNow);

        return await query.OrderBy(b => b.Session.StartTime).ToListAsync();
    }

    public async Task<(IReadOnlyList<Booking> Items, int Total)> GetAllBookingsAsync(int page, int pageSize, string? status)
    {
        var query = _context.Bookings
            .Include(b => b.Session)
            .Include(b => b.User)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
            query = query.Where(b => b.Status == status);

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(b => b.BookedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }

    public async Task<int> CountConfirmedAsync() =>
        await _context.Bookings.CountAsync(b => b.Status == BookingStatus.Confirmed);
}

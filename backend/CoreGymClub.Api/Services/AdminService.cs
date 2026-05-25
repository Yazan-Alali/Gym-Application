using CoreGymClub.Api.Data;
using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Helpers;
using CoreGymClub.Api.Interfaces;
using CoreGymClub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreGymClub.Api.Services;

public interface IAdminService
{
    Task<DashboardStatsDto> GetDashboardStatsAsync();
    Task<IReadOnlyList<BookingTrendDto>> GetBookingTrendsAsync();
    Task<IReadOnlyList<CategoryStatsDto>> GetCategoryStatsAsync();
    Task<IReadOnlyList<UserDto>> GetMembersAsync();
}

public class AdminService : IAdminService
{
    private readonly ApplicationDbContext _context;
    private readonly IBookingRepository _bookings;

    public AdminService(ApplicationDbContext context, IBookingRepository bookings)
    {
        _context = context;
        _bookings = bookings;
    }

    public async Task<DashboardStatsDto> GetDashboardStatsAsync()
    {
        var totalUsers = await _context.Users.CountAsync();
        var totalMembers = await _context.Users.CountAsync(u => u.Role.Name == RoleNames.Member);
        var totalBookings = await _bookings.CountConfirmedAsync();
        var activeSessions = await _context.Sessions.CountAsync(s => s.IsActive && s.StartTime >= DateTime.UtcNow);
        var upcomingBookings = await _context.Bookings.CountAsync(b =>
            b.Status == BookingStatus.Confirmed && b.Session.StartTime >= DateTime.UtcNow);
        var totalCapacity = await _context.Sessions.Where(s => s.IsActive).SumAsync(s => s.Capacity);
        var availableSpots = await _context.Sessions.Where(s => s.IsActive).SumAsync(s => s.AvailableSpots);

        return new DashboardStatsDto(
            totalUsers, totalMembers, totalBookings, activeSessions,
            upcomingBookings, totalCapacity, availableSpots
        );
    }

    public async Task<IReadOnlyList<BookingTrendDto>> GetBookingTrendsAsync()
    {
        var last7Days = Enumerable.Range(0, 7)
            .Select(i => DateTime.UtcNow.Date.AddDays(-6 + i))
            .ToList();

        var counts = await _context.Bookings
            .Where(b => b.BookedAt >= last7Days.First() && b.Status == BookingStatus.Confirmed)
            .GroupBy(b => b.BookedAt.Date)
            .Select(g => new { Date = g.Key, Count = g.Count() })
            .ToListAsync();

        return last7Days.Select(d => new BookingTrendDto(
            d.ToString("ddd"),
            counts.FirstOrDefault(c => c.Date == d)?.Count ?? 0
        )).ToList();
    }

    public async Task<IReadOnlyList<CategoryStatsDto>> GetCategoryStatsAsync()
    {
        return await _context.Sessions
            .GroupBy(s => s.Category)
            .Select(g => new CategoryStatsDto(
                g.Key,
                g.Count(),
                g.SelectMany(s => s.Bookings).Count(b => b.Status == BookingStatus.Confirmed)
            ))
            .OrderByDescending(c => c.BookingCount)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<UserDto>> GetMembersAsync()
    {
        var users = await _context.Users
            .Include(u => u.Role)
            .Where(u => u.Role.Name == RoleNames.Member)
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync();
        return users.Select(MappingHelper.ToUserDto).ToList();
    }
}

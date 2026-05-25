using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Helpers;
using CoreGymClub.Api.Interfaces;
using CoreGymClub.Api.Models;

namespace CoreGymClub.Api.Services;

public interface IBookingService
{
    Task<(BookingDto? Result, string? Error)> BookAsync(int userId, int sessionId);
    Task<string?> CancelAsync(int userId, int bookingId, bool isAdmin);
    Task<IReadOnlyList<BookingDto>> GetUserBookingsAsync(int userId, bool upcomingOnly);
    Task<PagedResult<AdminBookingDto>> GetAllBookingsAsync(int page, int pageSize, string? status);
}

public class BookingService : IBookingService
{
    private readonly IBookingRepository _bookings;
    private readonly ISessionRepository _sessions;

    public BookingService(IBookingRepository bookings, ISessionRepository sessions)
    {
        _bookings = bookings;
        _sessions = sessions;
    }

    public async Task<(BookingDto? Result, string? Error)> BookAsync(int userId, int sessionId)
    {
        var session = await _sessions.GetByIdAsync(sessionId);
        if (session == null) return (null, "Session not found.");
        if (!session.IsActive) return (null, "Session is not available.");
        if (session.StartTime < DateTime.UtcNow) return (null, "Cannot book past sessions.");
        if (session.AvailableSpots <= 0) return (null, "No spots available.");

        if (await _bookings.HasActiveBookingAsync(userId, sessionId))
            return (null, "You already have a booking for this session.");

        var booking = new Booking
        {
            UserId = userId,
            SessionId = sessionId,
            Status = BookingStatus.Confirmed
        };

        session.AvailableSpots--;
        await _sessions.UpdateAsync(session);
        await _bookings.AddAsync(booking);

        booking = (await _bookings.GetByIdAsync(booking.Id))!;
        return (MappingHelper.ToBookingDto(booking), null);
    }

    public async Task<string?> CancelAsync(int userId, int bookingId, bool isAdmin)
    {
        var booking = await _bookings.GetByIdAsync(bookingId);
        if (booking == null) return "Booking not found.";
        if (!isAdmin && booking.UserId != userId) return "Unauthorized.";
        if (booking.Status == BookingStatus.Cancelled) return "Booking is already cancelled.";

        booking.Status = BookingStatus.Cancelled;
        var session = await _sessions.GetByIdAsync(booking.SessionId);
        if (session != null)
        {
            session.AvailableSpots = Math.Min(session.Capacity, session.AvailableSpots + 1);
            await _sessions.UpdateAsync(session);
        }

        await _bookings.UpdateAsync(booking);
        return null;
    }

    public async Task<IReadOnlyList<BookingDto>> GetUserBookingsAsync(int userId, bool upcomingOnly)
    {
        var bookings = await _bookings.GetUserBookingsAsync(userId, upcomingOnly);
        return bookings.Select(MappingHelper.ToBookingDto).ToList();
    }

    public async Task<PagedResult<AdminBookingDto>> GetAllBookingsAsync(int page, int pageSize, string? status)
    {
        var (items, total) = await _bookings.GetAllBookingsAsync(page, pageSize, status);
        return new PagedResult<AdminBookingDto>(
            items.Select(MappingHelper.ToAdminBookingDto).ToList(),
            total,
            page,
            pageSize
        );
    }
}

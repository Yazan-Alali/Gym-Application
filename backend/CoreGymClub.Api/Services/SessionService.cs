using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Helpers;
using CoreGymClub.Api.Interfaces;
using CoreGymClub.Api.Models;

namespace CoreGymClub.Api.Services;

public interface ISessionService
{
    Task<PagedResult<SessionDto>> GetSessionsAsync(SessionFilterParams filter);
    Task<SessionDto?> GetByIdAsync(int id);
    Task<IReadOnlyList<string>> GetCategoriesAsync();
    Task<(SessionDto? Result, string? Error)> CreateAsync(CreateSessionRequest request);
    Task<(SessionDto? Result, string? Error)> UpdateAsync(int id, UpdateSessionRequest request);
    Task<string?> DeleteAsync(int id);
}

public class SessionService : ISessionService
{
    private readonly ISessionRepository _sessions;
    private readonly IBookingRepository _bookings;

    public SessionService(ISessionRepository sessions, IBookingRepository bookings)
    {
        _sessions = sessions;
        _bookings = bookings;
    }

    public async Task<PagedResult<SessionDto>> GetSessionsAsync(SessionFilterParams filter)
    {
        var (items, total) = await _sessions.GetFilteredAsync(filter);
        return new PagedResult<SessionDto>(
            items.Select(MappingHelper.ToSessionDto).ToList(),
            total,
            filter.Page,
            filter.PageSize
        );
    }

    public async Task<SessionDto?> GetByIdAsync(int id)
    {
        var session = await _sessions.GetByIdAsync(id);
        return session == null ? null : MappingHelper.ToSessionDto(session);
    }

    public Task<IReadOnlyList<string>> GetCategoriesAsync() => _sessions.GetCategoriesAsync();

    public async Task<(SessionDto? Result, string? Error)> CreateAsync(CreateSessionRequest request)
    {
        if (request.EndTime <= request.StartTime)
            return (null, "End time must be after start time.");

        var session = new GymSession
        {
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            TrainerName = request.TrainerName.Trim(),
            Category = request.Category.Trim(),
            StartTime = request.StartTime.ToUniversalTime(),
            EndTime = request.EndTime.ToUniversalTime(),
            Capacity = request.Capacity,
            AvailableSpots = request.Capacity,
            Location = string.IsNullOrWhiteSpace(request.Location) ? "Main Hall" : request.Location.Trim()
        };

        await _sessions.AddAsync(session);
        return (MappingHelper.ToSessionDto(session), null);
    }

    public async Task<(SessionDto? Result, string? Error)> UpdateAsync(int id, UpdateSessionRequest request)
    {
        var session = await _sessions.GetByIdAsync(id);
        if (session == null) return (null, "Session not found.");
        if (request.EndTime <= request.StartTime)
            return (null, "End time must be after start time.");

        var confirmedCount = session.Capacity - session.AvailableSpots;
        if (request.Capacity < confirmedCount)
            return (null, $"Capacity cannot be less than current bookings ({confirmedCount}).");

        session.Title = request.Title.Trim();
        session.Description = request.Description.Trim();
        session.TrainerName = request.TrainerName.Trim();
        session.Category = request.Category.Trim();
        session.StartTime = request.StartTime.ToUniversalTime();
        session.EndTime = request.EndTime.ToUniversalTime();
        session.Capacity = request.Capacity;
        session.AvailableSpots = request.Capacity - confirmedCount;
        session.Location = request.Location.Trim();
        session.IsActive = request.IsActive;

        await _sessions.UpdateAsync(session);
        return (MappingHelper.ToSessionDto(session), null);
    }

    public async Task<string?> DeleteAsync(int id)
    {
        var session = await _sessions.GetByIdAsync(id);
        if (session == null) return "Session not found.";

        var hasBookings = session.Capacity > session.AvailableSpots;
        if (hasBookings)
            return "Cannot delete session with active bookings. Deactivate instead.";

        await _sessions.DeleteAsync(session);
        return null;
    }
}

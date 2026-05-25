using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Models;

namespace CoreGymClub.Api.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByIdAsync(int id);
    Task<IReadOnlyList<User>> GetAllMembersAsync();
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task<bool> EmailExistsAsync(string email);
}

public interface ISessionRepository
{
    Task<GymSession?> GetByIdAsync(int id);
    Task<(IReadOnlyList<GymSession> Items, int Total)> GetFilteredAsync(SessionFilterParams filter);
    Task AddAsync(GymSession session);
    Task UpdateAsync(GymSession session);
    Task DeleteAsync(GymSession session);
    Task<IReadOnlyList<string>> GetCategoriesAsync();
}

public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(int id);
    Task<bool> HasActiveBookingAsync(int userId, int sessionId);
    Task AddAsync(Booking booking);
    Task UpdateAsync(Booking booking);
    Task<IReadOnlyList<Booking>> GetUserBookingsAsync(int userId, bool upcomingOnly);
    Task<(IReadOnlyList<Booking> Items, int Total)> GetAllBookingsAsync(int page, int pageSize, string? status);
    Task<int> CountConfirmedAsync();
}

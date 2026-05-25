namespace CoreGymClub.Api.DTOs;

public record DashboardStatsDto(
    int TotalUsers,
    int TotalMembers,
    int TotalBookings,
    int ActiveSessions,
    int UpcomingBookings,
    int TotalCapacity,
    int AvailableSpots
);

public record BookingTrendDto(string Label, int Count);

public record CategoryStatsDto(string Category, int SessionCount, int BookingCount);

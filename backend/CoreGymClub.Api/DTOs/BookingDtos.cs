namespace CoreGymClub.Api.DTOs;

public record BookingDto(
    int Id,
    int SessionId,
    string SessionTitle,
    string Category,
    string TrainerName,
    DateTime StartTime,
    DateTime EndTime,
    string Location,
    string Status,
    DateTime BookedAt
);

public record AdminBookingDto(
    int Id,
    int UserId,
    string UserName,
    string UserEmail,
    int SessionId,
    string SessionTitle,
    DateTime StartTime,
    string Status,
    DateTime BookedAt
);

public record CreateBookingRequest(int SessionId);

using System.ComponentModel.DataAnnotations;

namespace CoreGymClub.Api.DTOs;

public record SessionDto(
    int Id,
    string Title,
    string Description,
    string TrainerName,
    string Category,
    DateTime StartTime,
    DateTime EndTime,
    int Capacity,
    int AvailableSpots,
    string Location,
    bool IsActive,
    bool IsFull
);

public record CreateSessionRequest(
    [Required][MaxLength(100)] string Title,
    [Required][MaxLength(500)] string Description,
    [Required][MaxLength(80)] string TrainerName,
    [Required][MaxLength(50)] string Category,
    [Required] DateTime StartTime,
    [Required] DateTime EndTime,
    [Range(1, 200)] int Capacity,
    [MaxLength(100)] string Location
);

public record UpdateSessionRequest(
    [Required][MaxLength(100)] string Title,
    [Required][MaxLength(500)] string Description,
    [Required][MaxLength(80)] string TrainerName,
    [Required][MaxLength(50)] string Category,
    [Required] DateTime StartTime,
    [Required] DateTime EndTime,
    [Range(1, 200)] int Capacity,
    [MaxLength(100)] string Location,
    bool IsActive
);

public record SessionFilterParams(
    string? Search,
    string? Category,
    DateTime? From,
    DateTime? To,
    bool? OnlyAvailable,
    bool IncludeInactive = false,
    int Page = 1,
    int PageSize = 10
);

public record PagedResult<T>(IReadOnlyList<T> Items, int TotalCount, int Page, int PageSize);

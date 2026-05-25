using System.ComponentModel.DataAnnotations;

namespace CoreGymClub.Api.DTOs;

public record RegisterRequest(
    [Required][MaxLength(50)] string FirstName,
    [Required][MaxLength(50)] string LastName,
    [Required][EmailAddress] string Email,
    [Required][MinLength(6)] string Password,
    [Phone] string? Phone
);

public record LoginRequest(
    [Required][EmailAddress] string Email,
    [Required] string Password
);

public record AuthResponse(
    string Token,
    DateTime ExpiresAt,
    UserDto User
);

public record UserDto(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string? Phone,
    string Role,
    DateTime CreatedAt
);

public record UpdateProfileRequest(
    [Required][MaxLength(50)] string FirstName,
    [Required][MaxLength(50)] string LastName,
    [Phone] string? Phone
);

public record ChangePasswordRequest(
    [Required] string CurrentPassword,
    [Required][MinLength(6)] string NewPassword
);

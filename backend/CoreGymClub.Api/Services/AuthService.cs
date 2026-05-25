using CoreGymClub.Api.Authentication;
using CoreGymClub.Api.Data;
using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Helpers;
using CoreGymClub.Api.Interfaces;
using CoreGymClub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreGymClub.Api.Services;

public interface IAuthService
{
    Task<(AuthResponse? Result, string? Error)> RegisterAsync(RegisterRequest request);
    Task<(AuthResponse? Result, string? Error)> LoginAsync(LoginRequest request);
    Task<(UserDto? Result, string? Error)> UpdateProfileAsync(int userId, UpdateProfileRequest request);
    Task<string?> ChangePasswordAsync(int userId, ChangePasswordRequest request);
}

public class AuthService : IAuthService
{
    private readonly IUserRepository _users;
    private readonly ApplicationDbContext _context;
    private readonly IJwtTokenService _jwt;

    public AuthService(IUserRepository users, ApplicationDbContext context, IJwtTokenService jwt)
    {
        _users = users;
        _context = context;
        _jwt = jwt;
    }

    public async Task<(AuthResponse? Result, string? Error)> RegisterAsync(RegisterRequest request)
    {
        if (await _users.EmailExistsAsync(request.Email.ToLower()))
            return (null, "Email is already registered.");

        var memberRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == RoleNames.Member);
        if (memberRole == null)
            return (null, "Member role not configured.");

        var user = new User
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = request.Email.ToLower().Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Phone = request.Phone,
            RoleId = memberRole.Id
        };

        await _users.AddAsync(user);
        user = (await _users.GetByIdAsync(user.Id))!;

        var (token, expires) = _jwt.GenerateToken(user);
        return (new AuthResponse(token, expires, MappingHelper.ToUserDto(user)), null);
    }

    public async Task<(AuthResponse? Result, string? Error)> LoginAsync(LoginRequest request)
    {
        var user = await _users.GetByEmailAsync(request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return (null, "Invalid email or password.");

        var (token, expires) = _jwt.GenerateToken(user);
        return (new AuthResponse(token, expires, MappingHelper.ToUserDto(user)), null);
    }

    public async Task<(UserDto? Result, string? Error)> UpdateProfileAsync(int userId, UpdateProfileRequest request)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return (null, "User not found.");

        user.FirstName = request.FirstName.Trim();
        user.LastName = request.LastName.Trim();
        user.Phone = request.Phone;
        await _users.UpdateAsync(user);
        return (MappingHelper.ToUserDto(user), null);
    }

    public async Task<string?> ChangePasswordAsync(int userId, ChangePasswordRequest request)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return "User not found.";
        if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
            return "Current password is incorrect.";

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
        await _users.UpdateAsync(user);
        return null;
    }
}

using System.Security.Claims;
using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Models;
using CoreGymClub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreGymClub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookings;

    public BookingsController(IBookingService bookings) => _bookings = bookings;

    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    private bool IsAdmin => User.IsInRole(RoleNames.Admin);

    [HttpGet("my")]
    public async Task<IActionResult> MyBookings([FromQuery] bool upcomingOnly = false) =>
        Ok(await _bookings.GetUserBookingsAsync(UserId, upcomingOnly));

    [HttpPost]
    public async Task<IActionResult> Book([FromBody] CreateBookingRequest request)
    {
        var (result, error) = await _bookings.BookAsync(UserId, request.SessionId);
        if (error != null) return BadRequest(new { message = error });
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Cancel(int id)
    {
        var error = await _bookings.CancelAsync(UserId, id, IsAdmin);
        if (error != null) return BadRequest(new { message = error });
        return Ok(new { message = "Booking cancelled successfully." });
    }

    [Authorize(Roles = RoleNames.Admin)]
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20, [FromQuery] string? status = null) =>
        Ok(await _bookings.GetAllBookingsAsync(page, pageSize, status));
}

using CoreGymClub.Api.Models;
using CoreGymClub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreGymClub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = RoleNames.Admin)]
public class AdminController : ControllerBase
{
    private readonly IAdminService _admin;

    public AdminController(IAdminService admin) => _admin = admin;

    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard() =>
        Ok(await _admin.GetDashboardStatsAsync());

    [HttpGet("analytics/bookings-trend")]
    public async Task<IActionResult> BookingTrends() =>
        Ok(await _admin.GetBookingTrendsAsync());

    [HttpGet("analytics/categories")]
    public async Task<IActionResult> CategoryStats() =>
        Ok(await _admin.GetCategoryStatsAsync());

    [HttpGet("members")]
    public async Task<IActionResult> Members() =>
        Ok(await _admin.GetMembersAsync());
}

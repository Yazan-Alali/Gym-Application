using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Models;
using CoreGymClub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreGymClub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SessionsController : ControllerBase
{
    private readonly ISessionService _sessions;

    public SessionsController(ISessionService sessions) => _sessions = sessions;

    [HttpGet]
    public async Task<IActionResult> GetSessions([FromQuery] SessionFilterParams filter) =>
        Ok(await _sessions.GetSessionsAsync(filter));

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories() =>
        Ok(await _sessions.GetCategoriesAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetSession(int id)
    {
        var session = await _sessions.GetByIdAsync(id);
        return session == null ? NotFound(new { message = "Session not found." }) : Ok(session);
    }

    [Authorize(Roles = RoleNames.Admin)]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSessionRequest request)
    {
        var (result, error) = await _sessions.CreateAsync(request);
        if (error != null) return BadRequest(new { message = error });
        return CreatedAtAction(nameof(GetSession), new { id = result!.Id }, result);
    }

    [Authorize(Roles = RoleNames.Admin)]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSessionRequest request)
    {
        var (result, error) = await _sessions.UpdateAsync(id, request);
        if (error != null) return BadRequest(new { message = error });
        return Ok(result);
    }

    [Authorize(Roles = RoleNames.Admin)]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var error = await _sessions.DeleteAsync(id);
        if (error != null) return BadRequest(new { message = error });
        return NoContent();
    }
}

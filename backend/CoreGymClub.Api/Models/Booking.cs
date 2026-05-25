namespace CoreGymClub.Api.Models;

public class Booking
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int SessionId { get; set; }
    public GymSession Session { get; set; } = null!;
    public DateTime BookedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = BookingStatus.Confirmed;
}

public static class BookingStatus
{
    public const string Confirmed = "Confirmed";
    public const string Cancelled = "Cancelled";
}

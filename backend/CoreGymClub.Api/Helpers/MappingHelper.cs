using CoreGymClub.Api.DTOs;
using CoreGymClub.Api.Models;

namespace CoreGymClub.Api.Helpers;

public static class MappingHelper
{
    public static UserDto ToUserDto(User user) => new(
        user.Id,
        user.FirstName,
        user.LastName,
        user.Email,
        user.Phone,
        user.Role.Name,
        user.CreatedAt
    );

    public static SessionDto ToSessionDto(GymSession session) => new(
        session.Id,
        session.Title,
        session.Description,
        session.TrainerName,
        session.Category,
        session.StartTime,
        session.EndTime,
        session.Capacity,
        session.AvailableSpots,
        session.Location,
        session.IsActive,
        session.AvailableSpots <= 0
    );

    public static BookingDto ToBookingDto(Booking booking) => new(
        booking.Id,
        booking.SessionId,
        booking.Session.Title,
        booking.Session.Category,
        booking.Session.TrainerName,
        booking.Session.StartTime,
        booking.Session.EndTime,
        booking.Session.Location,
        booking.Status,
        booking.BookedAt
    );

    public static AdminBookingDto ToAdminBookingDto(Booking booking) => new(
        booking.Id,
        booking.UserId,
        $"{booking.User.FirstName} {booking.User.LastName}",
        booking.User.Email,
        booking.SessionId,
        booking.Session.Title,
        booking.Session.StartTime,
        booking.Status,
        booking.BookedAt
    );
}

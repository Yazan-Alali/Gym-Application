using CoreGymClub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreGymClub.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        if (!await context.Roles.AnyAsync())
        {
            context.Roles.AddRange(
                new Role { Name = RoleNames.Admin },
                new Role { Name = RoleNames.Member }
            );
            await context.SaveChangesAsync();
        }

        var adminRole = await context.Roles.FirstAsync(r => r.Name == RoleNames.Admin);
        var memberRole = await context.Roles.FirstAsync(r => r.Name == RoleNames.Member);

        if (!await context.Users.AnyAsync(u => u.Email == "admin@coregymclub.se"))
        {
            context.Users.Add(new User
            {
                FirstName = "Admin",
                LastName = "Core",
                Email = "admin@coregymclub.se",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                RoleId = adminRole.Id,
                Phone = "+46 70 000 0001"
            });
            await context.SaveChangesAsync();
        }

        if (!await context.Sessions.AnyAsync())
        {
            var now = DateTime.UtcNow.Date.AddDays(1).AddHours(9);
            context.Sessions.AddRange(
                new GymSession
                {
                    Title = "Morning HIIT Blast",
                    Description = "High-intensity interval training to kickstart your day.",
                    TrainerName = "Elena Andersson",
                    Category = "HIIT",
                    StartTime = now,
                    EndTime = now.AddHours(1),
                    Capacity = 20,
                    AvailableSpots = 20,
                    Location = "Studio A"
                },
                new GymSession
                {
                    Title = "Strength Foundations",
                    Description = "Compound lifts and progressive overload for all levels.",
                    TrainerName = "Marcus Lindqvist",
                    Category = "Strength",
                    StartTime = now.AddDays(1).AddHours(10),
                    EndTime = now.AddDays(1).AddHours(11),
                    Capacity = 15,
                    AvailableSpots = 15,
                    Location = "Weight Room"
                },
                new GymSession
                {
                    Title = "Evening Yoga Flow",
                    Description = "Relaxing vinyasa flow to improve mobility and recovery.",
                    TrainerName = "Sofia Berg",
                    Category = "Yoga",
                    StartTime = now.AddDays(2).AddHours(18),
                    EndTime = now.AddDays(2).AddHours(19),
                    Capacity = 25,
                    AvailableSpots = 25,
                    Location = "Studio B"
                },
                new GymSession
                {
                    Title = "Spin & Burn",
                    Description = "Indoor cycling session with energetic playlists.",
                    TrainerName = "Jonas Ek",
                    Category = "Cardio",
                    StartTime = now.AddDays(3).AddHours(17),
                    EndTime = now.AddDays(3).AddHours(18),
                    Capacity = 18,
                    AvailableSpots = 18,
                    Location = "Cycle Studio"
                }
            );
            await context.SaveChangesAsync();
        }
    }
}

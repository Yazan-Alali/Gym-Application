namespace CoreGymClub.Api.Authentication;

public class JwtSettings
{
    public const string SectionName = "Jwt";
    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = "CoreGymClub";
    public string Audience { get; set; } = "CoreGymClubUsers";
    public int ExpirationHours { get; set; } = 24;
}

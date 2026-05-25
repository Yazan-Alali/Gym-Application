# Database migrations

On first run, the application uses `EnsureCreated` and seeds demo data automatically.

To use EF Core migrations instead:

```bash
dotnet ef migrations add InitialCreate --output-dir Migrations
dotnet ef database update
```

Then update `DbSeeder.cs` to call `MigrateAsync()` instead of `EnsureCreatedAsync()` if preferred.

using Microsoft.EntityFrameworkCore;
using MrBill.Api.Data;
using MrBill.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<BlogStatsService>();

var provider = builder.Configuration.GetValue<string>("Database:Provider") ?? "Sqlite";
var connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<BlogStatsDbContext>(options =>
{
    if (string.Equals(provider, "SqlServer", StringComparison.OrdinalIgnoreCase))
    {
        options.UseSqlServer(connectionString);
        return;
    }

    options.UseSqlite(connectionString ?? "Data Source=App_Data/blogstats.db");
});

var allowedOrigins =
    builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "https://mrbill-dev.github.io" };

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "BlogFrontends",
        policy =>
            policy
                .WithOrigins(allowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
    );
});

var app = builder.Build();

await BlogStatsSeedService.ApplyAsync(app.Services);

app.UseCors("BlogFrontends");
app.MapControllers();
app.MapGet("/ping", () => Results.Ok(new { ok = true }));

app.Run();

using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using MrBill.Api.Data;
using MrBill.Api.Models;

namespace MrBill.Api.Services;

public static class BlogStatsSeedService
{
    private sealed class SeedFile
    {
        public List<SeedArticle>? Articles { get; set; }
    }

    private sealed class SeedArticle
    {
        public string? Slug { get; set; }
        public string? PageUrl { get; set; }
        public int? LikeCount { get; set; }
    }

    public static async Task ApplyAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<BlogStatsDbContext>();
        await db.Database.EnsureCreatedAsync();

        var seedPath = Path.Combine(AppContext.BaseDirectory, "Data", "seed-counts.json");
        if (!File.Exists(seedPath))
        {
            return;
        }

        var json = await File.ReadAllTextAsync(seedPath);
        var seed = JsonSerializer.Deserialize<SeedFile>(
            json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        if (seed?.Articles == null)
        {
            return;
        }

        foreach (var item in seed.Articles)
        {
            if (string.IsNullOrWhiteSpace(item.PageUrl) || !item.LikeCount.HasValue)
            {
                continue;
            }

            var pageUrl = item.PageUrl.Trim();
            var slug = (item.Slug ?? ExtractSlug(pageUrl)).Trim();
            var existing = await db.BlogStats.FindAsync(pageUrl);

            if (existing == null)
            {
                db.BlogStats.Add(
                    new BlogStat
                    {
                        PageUrl = pageUrl,
                        Slug = slug,
                        LikeCount = Math.Max(0, item.LikeCount.Value)
                    }
                );
                continue;
            }

            if (existing.LikeCount < item.LikeCount.Value)
            {
                existing.LikeCount = item.LikeCount.Value;
                existing.Slug = slug;
            }
        }

        await db.SaveChangesAsync();
    }

    private static string ExtractSlug(string pageUrl)
    {
        if (!Uri.TryCreate(pageUrl, UriKind.Absolute, out var uri))
        {
            return "";
        }

        var name = Path.GetFileNameWithoutExtension(uri.AbsolutePath);
        return string.IsNullOrWhiteSpace(name) ? "" : name;
    }
}

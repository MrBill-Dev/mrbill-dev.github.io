using Microsoft.EntityFrameworkCore;
using MrBill.Api.Data;
using MrBill.Api.Models;

namespace MrBill.Api.Services;

public class BlogStatsService
{
    private readonly BlogStatsDbContext _db;

    public BlogStatsDbContext Db => _db;

    public BlogStatsService(BlogStatsDbContext db)
    {
        _db = db;
    }

    public async Task<int> GetCountAsync(string pageUrl, CancellationToken ct = default)
    {
        var row = await _db.BlogStats.AsNoTracking()
            .FirstOrDefaultAsync(x => x.PageUrl == pageUrl, ct);
        return row?.LikeCount ?? 0;
    }

    public async Task<int> IncrementAsync(string pageUrl, CancellationToken ct = default)
    {
        var row = await _db.BlogStats.FirstOrDefaultAsync(x => x.PageUrl == pageUrl, ct);
        if (row == null)
        {
            row = new BlogStat
            {
                PageUrl = pageUrl,
                Slug = ExtractSlug(pageUrl),
                LikeCount = 1
            };
            _db.BlogStats.Add(row);
        }
        else
        {
            row.LikeCount += 1;
            if (string.IsNullOrWhiteSpace(row.Slug))
            {
                row.Slug = ExtractSlug(pageUrl);
            }
        }

        await _db.SaveChangesAsync(ct);
        return row.LikeCount;
    }

    public static string NormalizePageUrl(string? referer)
    {
        if (string.IsNullOrWhiteSpace(referer))
        {
            return "";
        }

        var trimmed = referer.Trim();
        if (!Uri.TryCreate(trimmed, UriKind.Absolute, out var uri))
        {
            return "";
        }

        return uri.GetLeftPart(UriPartial.Path).TrimEnd('/');
    }

    public static string ExtractSlug(string pageUrl)
    {
        if (!Uri.TryCreate(pageUrl, UriKind.Absolute, out var uri))
        {
            return "";
        }

        var name = Path.GetFileNameWithoutExtension(uri.AbsolutePath);
        return string.IsNullOrWhiteSpace(name) ? "" : name;
    }
}

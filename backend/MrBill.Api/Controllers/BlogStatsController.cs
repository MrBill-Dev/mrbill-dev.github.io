using Microsoft.AspNetCore.Mvc;
using MrBill.Api.Services;

namespace MrBill.Api.Controllers;

[ApiController]
[Route("api")]
public class BlogStatsController : ControllerBase
{
    private readonly BlogStatsService _stats;

    public BlogStatsController(BlogStatsService stats)
    {
        _stats = stats;
    }

    [HttpGet]
    public Task<IActionResult> GetAsync(
        [FromHeader(Name = "x-bsz-referer")] string? referer,
        CancellationToken ct
    )
    {
        return RespondAsync(referer, increment: false, ct);
    }

    [HttpPost]
    public Task<IActionResult> PostAsync(
        [FromHeader(Name = "x-bsz-referer")] string? referer,
        CancellationToken ct
    )
    {
        return RespondAsync(referer, increment: true, ct);
    }

    [HttpOptions]
    public IActionResult Options()
    {
        return NoContent();
    }

    private async Task<IActionResult> RespondAsync(
        string? referer,
        bool increment,
        CancellationToken ct
    )
    {
        var pageUrl = BlogStatsService.NormalizePageUrl(referer);
        if (string.IsNullOrWhiteSpace(pageUrl))
        {
            return BadRequest(
                new
                {
                    success = false,
                    message = "Missing or invalid x-bsz-referer header."
                }
            );
        }

        var count = increment
            ? await _stats.IncrementAsync(pageUrl, ct)
            : await _stats.GetCountAsync(pageUrl, ct);

        return Ok(
            new
            {
                success = true,
                data = new { page_pv = count }
            }
        );
    }
}

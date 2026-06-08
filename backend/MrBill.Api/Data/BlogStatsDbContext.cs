using Microsoft.EntityFrameworkCore;
using MrBill.Api.Models;

namespace MrBill.Api.Data;

public class BlogStatsDbContext : DbContext
{
    public BlogStatsDbContext(DbContextOptions<BlogStatsDbContext> options)
        : base(options)
    {
    }

    public DbSet<BlogStat> BlogStats => Set<BlogStat>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BlogStat>(entity =>
        {
            entity.ToTable("BlogStats");
            entity.HasKey(x => x.PageUrl);
            entity.Property(x => x.PageUrl).HasMaxLength(500);
            entity.Property(x => x.Slug).HasMaxLength(200);
        });
    }
}

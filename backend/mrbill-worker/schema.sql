CREATE TABLE IF NOT EXISTS blog_stats (
  page_url   TEXT PRIMARY KEY,
  slug       TEXT NOT NULL DEFAULT '',
  like_count INTEGER NOT NULL DEFAULT 0
);

-- 文章表請用 schema-articles.sql 或 migrate-articles-v2.sql 建立

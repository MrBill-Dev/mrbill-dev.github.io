CREATE TABLE IF NOT EXISTS blog_stats (
  page_url   TEXT PRIMARY KEY,
  slug       TEXT NOT NULL DEFAULT '',
  like_count INTEGER NOT NULL DEFAULT 0
);

-- 預留：之後新文章上下架用（現階段可不寫入）
CREATE TABLE IF NOT EXISTS articles (
  slug         TEXT PRIMARY KEY,
  title        TEXT NOT NULL DEFAULT '',
  content_html TEXT NOT NULL DEFAULT '',
  published    INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

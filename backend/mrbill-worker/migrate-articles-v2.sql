-- 修正舊版 articles 表（只有 published 欄位、沒有 status）
-- 可安全重跑：articles 尚無正式資料時使用

DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS auth_failures;

CREATE TABLE articles (
  slug          TEXT PRIMARY KEY,
  title         TEXT NOT NULL DEFAULT '',
  subtitle      TEXT NOT NULL DEFAULT '',
  excerpt       TEXT NOT NULL DEFAULT '',
  label         TEXT NOT NULL DEFAULT '',
  audience      TEXT NOT NULL DEFAULT '',
  category      TEXT NOT NULL DEFAULT '',
  author        TEXT NOT NULL DEFAULT 'Mr.Bill',
  date          TEXT NOT NULL DEFAULT '',
  read_mins     INTEGER NOT NULL DEFAULT 5,
  tags          TEXT NOT NULL DEFAULT '[]',
  cover         TEXT NOT NULL DEFAULT '',
  related_slugs TEXT NOT NULL DEFAULT '[]',
  content_html  TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'draft',
  published_at  TEXT,
  featured      INTEGER NOT NULL DEFAULT 0,
  home_marquee  INTEGER NOT NULL DEFAULT 0,
  home_carousel INTEGER NOT NULL DEFAULT 0,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE auth_failures (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  ip         TEXT NOT NULL,
  path       TEXT NOT NULL DEFAULT '',
  failed_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_auth_failures_ip ON auth_failures(ip, failed_at);

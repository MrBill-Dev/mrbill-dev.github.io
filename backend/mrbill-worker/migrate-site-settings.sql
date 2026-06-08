-- 首頁橫幅等全站設定（執行一次即可）
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL DEFAULT '0',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO site_settings (key, value) VALUES ('home_strip_show_nav', '0');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('home_strip_interval_sec', '10');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('home_strip_transition_ms', '900');

-- 詢問表單收件記錄（執行一次即可）
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL DEFAULT 'web-service',
  name TEXT NOT NULL DEFAULT '',
  brand TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  contact TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT '',
  budget TEXT NOT NULL DEFAULT '',
  goal TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  page_url TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 新增表單控制設定到 site_settings（site_settings 必須已存在）
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('contact_form_enabled', '1');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('contact_form_to_email', '');

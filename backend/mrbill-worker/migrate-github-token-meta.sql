-- GitHub Token 到期日與探測紀錄（執行一次即可，需先有 site_settings 表）
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('github_token_expires_at', '');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('github_token_last_probe_at', '');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('github_token_last_probe_ok', '');

-- 標題字型：sans（黑體，預設）| serif（明體）
ALTER TABLE articles ADD COLUMN title_font TEXT NOT NULL DEFAULT 'sans';

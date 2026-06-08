-- 四篇靜態文章起始喜歡數（自 bsz 截圖接續，2026-06-08）
INSERT INTO blog_stats (page_url, slug, like_count) VALUES
  ('https://mrbill-dev.github.io/blog/taipei-newtaipei-rainy-day-family.html', 'taipei-newtaipei-rainy-day-family', 136),
  ('https://mrbill-dev.github.io/blog/2026-06-06-ai-workflow-lesson-04-06.html', '2026-06-06-ai-workflow-lesson-04-06', 147),
  ('https://mrbill-dev.github.io/blog/2026-06-05-ai-workflow-lesson-01-02.html', '2026-06-05-ai-workflow-lesson-01-02', 177),
  ('https://mrbill-dev.github.io/blog/2026-05-31-ai-prompt-six-levels.html', '2026-05-31-ai-prompt-six-levels', 98)
ON CONFLICT(page_url) DO UPDATE SET
  like_count = MAX(like_count, excluded.like_count);

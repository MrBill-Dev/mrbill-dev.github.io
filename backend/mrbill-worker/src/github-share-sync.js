import {
  buildPublishedArticlePageHtml,
  publishedArticleFilePath,
  legacyFlatPublishedArticleFilePath,
  blogArticlePublicUrl
} from "./article-page-html.js";
import { ogSidecarFilePath } from "./og-sidecar-html.js";
import {
  SITE_ORIGIN,
  blogArticleOgTitle,
  blogResolveCover,
  absUrl
} from "./share-seo.js";

const PUBLISHED_MANIFEST_PATH = "blog/_generated/manifest.json";

const LEGACY_STATIC_SLUGS = new Set([
  "taipei-newtaipei-rainy-day-family",
  "2026-06-06-ai-workflow-lesson-04-06",
  "2026-06-05-ai-workflow-lesson-01-02",
  "2026-05-31-ai-prompt-six-levels"
]);

function toBase64Utf8(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function githubConfig(env) {
  const token = String(env.GITHUB_TOKEN || "").trim();
  const repo = String(env.GITHUB_REPO || "MrBill-Dev/mrbill-dev.github.io").trim();
  const branch = String(env.GITHUB_BRANCH || "main").trim();
  if (!token) return null;
  return { token, repo, branch };
}

async function githubApi(env, path, options) {
  const cfg = githubConfig(env);
  if (!cfg) throw new Error("GITHUB_TOKEN 未設定");
  const url = "https://api.github.com/repos/" + cfg.repo + path;
  const res = await fetch(url, {
    method: options.method || "GET",
    headers: Object.assign(
      {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + cfg.token,
        "User-Agent": "mrbill-stats-worker",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      options.headers || {}
    ),
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const text = await res.text();
  let json = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { message: text };
    }
  }
  if (!res.ok) {
    const msg = (json && json.message) || "GitHub API HTTP " + res.status;
    const hint =
      res.status === 401
        ? "（Token 無效或過期，請重新 wrangler secret put GITHUB_TOKEN）"
        : res.status === 403
          ? "（Token 權限不足：需對 mrbill-dev.github.io 的 Contents 讀寫）"
          : res.status === 404
            ? "（找不到 repo 或路徑，請確認 GITHUB_REPO）"
            : "";
    const extra =
      json && json.errors && json.errors.length
        ? " " + JSON.stringify(json.errors)
        : "";
    throw new Error(msg + hint + extra);
  }
  return json;
}

function encodeGithubPath(path) {
  return path
    .split("/")
    .map(function (part) {
      return encodeURIComponent(part);
    })
    .join("/");
}

async function getGithubFileMeta(env, path) {
  const cfg = githubConfig(env);
  if (!cfg) return null;
  try {
    const json = await githubApi(
      env,
      "/contents/" +
        encodeGithubPath(path) +
        "?ref=" +
        encodeURIComponent(cfg.branch),
      { method: "GET" }
    );
    return { sha: json.sha, path: path };
  } catch (err) {
    if (/404|Not Found/i.test(err.message || "")) return null;
    throw err;
  }
}

async function removeGithubFileIfExists(env, path, message) {
  const existing = await getGithubFileMeta(env, path);
  if (!existing || !existing.sha) return false;
  await githubApi(env, "/contents/" + encodeGithubPath(path), {
    method: "DELETE",
    body: {
      message: message,
      sha: existing.sha,
      branch: githubConfig(env).branch
    }
  });
  return true;
}

async function putGithubTextFile(env, path, message, text) {
  const existing = await getGithubFileMeta(env, path);
  const body = {
    message: message,
    content: toBase64Utf8(text),
    branch: githubConfig(env).branch
  };
  if (existing && existing.sha) body.sha = existing.sha;
  return githubApi(env, "/contents/" + encodeGithubPath(path), {
    method: "PUT",
    body: body
  });
}

function manifestEntryFromRow(row) {
  const article = {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    cover: row.cover,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    date: row.date
  };
  const slug = article.slug;
  return {
    slug: slug,
    staticPath: publishedArticleFilePath(slug),
    url: blogArticlePublicUrl(slug, SITE_ORIGIN),
    title: String(article.title || "").trim(),
    ogTitle: blogArticleOgTitle(article),
    description: String(article.excerpt || article.subtitle || "").trim(),
    ogImage: absUrl(SITE_ORIGIN, blogResolveCover(article)),
    publishedAt: article.publishedAt || article.date || null,
    updatedAt: article.updatedAt || null
  };
}

/** slug → 靜態檔對照表（供除錯／工具；FB 讀各篇 blog/slug/） */
export async function rebuildPublishedManifestOnGitHub(env) {
  const cfg = githubConfig(env);
  if (!cfg) {
    return { ok: false, skipped: true, message: "GITHUB_TOKEN 未設定" };
  }
  if (!env.DB) {
    return { ok: false, skipped: true, message: "D1 未設定" };
  }

  const result = await env.DB.prepare(
    `SELECT slug, title, subtitle, excerpt, cover, published_at, updated_at, date, sort_order
     FROM articles
     WHERE status = 'published'
     ORDER BY sort_order DESC, date DESC`
  ).all();
  const rows = result.results || [];
  const articles = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row.slug || LEGACY_STATIC_SLUGS.has(row.slug)) continue;
    articles.push(manifestEntryFromRow(row));
  }

  const manifest = {
    version: 1,
    description:
      "已上架動態文：slug 對應 GitHub 靜態頁路徑與分享用 meta（後台儲存時自動更新）",
    updatedAt: new Date().toISOString(),
    siteOrigin: SITE_ORIGIN,
    count: articles.length,
    articles: articles
  };
  const text = JSON.stringify(manifest, null, 2) + "\n";
  await putGithubTextFile(
    env,
    PUBLISHED_MANIFEST_PATH,
    "chore(article): rebuild published manifest",
    text
  );
  return { ok: true, path: PUBLISHED_MANIFEST_PATH, count: articles.length };
}

async function maybeRebuildPublishedManifest(env) {
  try {
    return await rebuildPublishedManifestOnGitHub(env);
  } catch (err) {
    return {
      ok: false,
      skipped: true,
      message: "manifest 同步失敗（不影響文章頁）：" + (err.message || String(err))
    };
  }
}

export function shouldPublishArticlePage(article) {
  if (!article || !article.slug) return false;
  if (LEGACY_STATIC_SLUGS.has(article.slug)) return false;
  return article.status === "published";
}

export function canRemovePublishedArticlePage(slug) {
  return slug && !LEGACY_STATIC_SLUGS.has(slug);
}

export async function syncArticleSharePageToGitHub(env, article) {
  const cfg = githubConfig(env);
  if (!cfg) {
    return {
      ok: false,
      skipped: true,
      message:
        "GITHUB_TOKEN 未設定，無法同步文章頁。請見 backend/mrbill-worker/ADMIN-SETUP.md"
    };
  }
  if (!shouldPublishArticlePage(article)) {
    return { ok: true, skipped: true, message: "非已上架動態文，略過 GitHub 同步" };
  }

  const pageUrl = blogArticlePublicUrl(article.slug, SITE_ORIGIN);
  const html = buildPublishedArticlePageHtml(article);
  const path = publishedArticleFilePath(article.slug);
  const existing = await getGithubFileMeta(env, path);

  const json = await putGithubTextFile(
    env,
    path,
    "chore(article): publish " + article.slug,
    html
  );

  await removeGithubFileIfExists(
    env,
    ogSidecarFilePath(article.slug),
    "chore(article): remove og sidecar for " + article.slug
  );
  await removeGithubFileIfExists(
    env,
    legacyFlatPublishedArticleFilePath(article.slug),
    "chore(article): remove legacy flat page for " + article.slug
  );

  const manifest = await maybeRebuildPublishedManifest(env);

  return {
    ok: true,
    url: pageUrl,
    path: path,
    commit: json.commit && json.commit.html_url,
    updated: !!(existing && existing.sha),
    manifest: manifest
  };
}

export async function removeArticleSharePageFromGitHub(env, slug) {
  const cfg = githubConfig(env);
  if (!cfg) {
    return { ok: false, skipped: true, message: "GITHUB_TOKEN 未設定" };
  }
  if (!canRemovePublishedArticlePage(slug)) {
    return { ok: true, skipped: true, message: "靜態保護 slug，略過刪除" };
  }
  const path = publishedArticleFilePath(slug);
  const removed = await removeGithubFileIfExists(
    env,
    path,
    "chore(article): unpublish " + slug
  );
  await removeGithubFileIfExists(
    env,
    ogSidecarFilePath(slug),
    "chore(article): remove og sidecar for " + slug
  );
  await removeGithubFileIfExists(
    env,
    legacyFlatPublishedArticleFilePath(slug),
    "chore(article): remove legacy flat page for " + slug
  );
  const manifest = await maybeRebuildPublishedManifest(env);
  if (!removed) {
    return {
      ok: true,
      skipped: true,
      message: "GitHub 文章頁不存在，略過刪除",
      manifest: manifest
    };
  }
  return { ok: true, removed: true, path: path, manifest: manifest };
}

/** 管理員診斷：測試 GITHUB_TOKEN 能否讀寫 repo（不修改文章頁） */
export async function probeGithubSyncAccess(env) {
  const cfg = githubConfig(env);
  if (!cfg) {
    return { ok: false, message: "GITHUB_TOKEN 未設定", tokenLength: 0 };
  }
  const tokenLength = cfg.token.length;
  try {
    await githubApi(env, "", { method: "GET" });
    const meta = await getGithubFileMeta(env, "blog/index.html");
    if (!meta || !meta.sha) {
      return {
        ok: false,
        tokenLength: tokenLength,
        message: "Token 可連線，但讀不到 blog/index.html（請確認 GITHUB_REPO／GITHUB_BRANCH）"
      };
    }
    return {
      ok: true,
      tokenLength: tokenLength,
      repo: cfg.repo,
      branch: cfg.branch,
      message: "GitHub 已連線，可同步文章頁"
    };
  } catch (err) {
    return {
      ok: false,
      tokenLength: tokenLength,
      message: err && err.message ? err.message : String(err)
    };
  }
}

export async function maybeSyncSharePageForArticle(env, article) {
  if (!article || !article.slug) {
    return { ok: false, skipped: true, message: "缺少 slug" };
  }
  if (shouldPublishArticlePage(article)) {
    return syncArticleSharePageToGitHub(env, article);
  }
  if (article.status === "archived" || article.status === "draft") {
    return removeArticleSharePageFromGitHub(env, article.slug);
  }
  return { ok: true, skipped: true, message: "目前狀態不需同步 GitHub 文章頁" };
}

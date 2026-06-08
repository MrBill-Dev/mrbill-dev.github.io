const ALLOWED_ORIGINS = [
  "https://mrbill-dev.github.io",
  "https://plan.get.com.tw",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

const MAX_BODY_BYTES = 512 * 1024;
const MAX_AUTH_FAILURES = 8;
const AUTH_WINDOW_MINUTES = 15;
const VALID_STATUS = new Set(["draft", "scheduled", "published", "archived"]);
const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,98}[a-z0-9])?$/;
const LEGACY_STATIC_SLUGS = new Set([
  "taipei-newtaipei-rainy-day-family",
  "2026-06-06-ai-workflow-lesson-04-06",
  "2026-06-05-ai-workflow-lesson-01-02",
  "2026-05-31-ai-prompt-six-levels"
]);

function corsHeaders(request, extra) {
  const origin = request.headers.get("Origin") || "";
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return Object.assign(
    {
      "Access-Control-Allow-Origin": allow,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Accept, Authorization, x-bsz-referer",
      "Access-Control-Allow-Credentials": "true",
      Vary: "Origin"
    },
    extra || {}
  );
}

function jsonResponse(request, body, status, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign(
      {
        "Content-Type": "application/json; charset=utf-8"
      },
      corsHeaders(request, extraHeaders)
    )
  });
}

function clientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown"
  )
    .split(",")[0]
    .trim();
}

function normalizePageUrl(referer, canonicalOrigin) {
  if (!referer) return "";
  try {
    const url = new URL(referer.trim());
    const path = url.pathname.replace(/\/+$/, "");
    const origin = (canonicalOrigin || "https://mrbill-dev.github.io").replace(
      /\/+$/,
      ""
    );
    return origin + path;
  } catch {
    return "";
  }
}

function slugFromPageUrl(pageUrl) {
  try {
    const path = new URL(pageUrl).pathname;
    const file = path.split("/").pop() || "";
    return file.replace(/\.html$/i, "");
  } catch {
    return "";
  }
}

function isValidSlug(slug) {
  return typeof slug === "string" && SLUG_RE.test(slug);
}

function stripDangerousHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

function parseJsonField(value, fallback) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function rowToArticle(row, includeContent) {
  if (!row) return null;
  const article = {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    label: row.label,
    audience: row.audience,
    category: row.category,
    author: row.author,
    date: row.date,
    readMins: Number(row.read_mins) || 0,
    tags: parseJsonField(row.tags, []),
    cover: row.cover,
    relatedSlugs: parseJsonField(row.related_slugs, []),
    status: row.status,
    publishedAt: row.published_at,
    featured: !!row.featured,
    homeMarquee: !!row.home_marquee,
    homeCarousel: !!row.home_carousel,
    listStyle: row.list_style || "auto",
    titleFont: row.title_font === "serif" ? "serif" : "sans",
    pinned: !!row.pinned,
    badgePopular: !!row.badge_popular,
    badgeTrending: !!row.badge_trending,
    sortOrder: Number(row.sort_order) || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
  if (includeContent) article.contentHtml = row.content_html;
  return article;
}

function nowSql() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

function isPubliclyVisible(row, nowSqlStr) {
  if (!row) return false;
  const now = nowSqlStr || nowSql();
  if (row.status === "published") {
    if (!row.published_at) return true;
    return row.published_at <= now;
  }
  if (row.status === "scheduled" && row.published_at && row.published_at <= now) {
    return true;
  }
  return false;
}

async function publishDueScheduledArticles(db) {
  const now = nowSql();
  const result = await db
    .prepare(
      `UPDATE articles
       SET status = 'published', updated_at = datetime('now')
       WHERE status = 'scheduled'
         AND published_at IS NOT NULL
         AND published_at <= ?`
    )
    .bind(now)
    .run();
  return result.meta && result.meta.changes ? Number(result.meta.changes) : 0;
}

async function recordAuthFailure(db, ip, path) {
  await db
    .prepare("INSERT INTO auth_failures (ip, path) VALUES (?, ?)")
    .bind(ip, path)
    .run();
  await db
    .prepare(
      "DELETE FROM auth_failures WHERE failed_at < datetime('now', ?)"
    )
    .bind(`-${AUTH_WINDOW_MINUTES} minutes`)
    .run();
}

async function isIpBlocked(db, ip) {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS c FROM auth_failures
       WHERE ip = ? AND failed_at >= datetime('now', ?)`
    )
    .bind(ip, `-${AUTH_WINDOW_MINUTES} minutes`)
    .first();
  return row && Number(row.c) >= MAX_AUTH_FAILURES;
}

function extractBearer(request) {
  const h = request.headers.get("Authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1].trim() : "";
}

async function requireAdmin(request, env, db, path) {
  const ip = clientIp(request);
  if (await isIpBlocked(db, ip)) {
    return { ok: false, status: 429, message: "Too many failed attempts. Try later." };
  }
  const token = extractBearer(request);
  const expected = env.ADMIN_TOKEN || "";
  if (!expected || token.length < 8 || token !== expected) {
    await recordAuthFailure(db, ip, path);
    return { ok: false, status: 401, message: "Unauthorized" };
  }
  return { ok: true };
}

async function readJsonBody(request) {
  const raw = request.headers.get("Content-Length");
  if (raw && Number(raw) > MAX_BODY_BYTES) {
    throw new Error("Payload too large");
  }
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new Error("Payload too large");
  if (!text) return {};
  return JSON.parse(text);
}

function normalizeArticleInput(body, existing) {
  const out = Object.assign({}, existing || {});
  if (body.slug != null) {
    if (!isValidSlug(body.slug)) throw new Error("Invalid slug");
    if (LEGACY_STATIC_SLUGS.has(body.slug)) {
      throw new Error("Slug reserved for legacy static article");
    }
    out.slug = body.slug;
  }
  const strFields = [
    "title",
    "subtitle",
    "excerpt",
    "label",
    "audience",
    "category",
    "author",
    "date",
    "cover",
    "publishedAt"
  ];
  strFields.forEach(function (key) {
    if (body[key] != null) out[key] = String(body[key]).slice(0, 2000);
  });
  if (body.title != null && !out.title.trim()) throw new Error("Title required");
  if (body.readMins != null) {
    const n = Number(body.readMins);
    if (!isFinite(n) || n < 1 || n > 999) throw new Error("Invalid readMins");
    out.readMins = Math.floor(n);
  }
  if (body.tags != null) out.tags = parseJsonField(body.tags, []);
  if (body.relatedSlugs != null) {
    out.relatedSlugs = parseJsonField(body.relatedSlugs, []).filter(isValidSlug);
  }
  if (body.contentHtml != null) {
    out.contentHtml = stripDangerousHtml(String(body.contentHtml)).slice(0, 400000);
  }
  if (body.status != null) {
    if (!VALID_STATUS.has(body.status)) throw new Error("Invalid status");
    out.status = body.status;
  }
  ["featured", "homeMarquee", "homeCarousel", "pinned", "badgePopular", "badgeTrending"].forEach(
    function (key) {
      if (body[key] != null) out[key] = !!body[key];
    }
  );
  if (body.listStyle != null) {
    const styles = new Set(["auto", "full", "compact"]);
    if (!styles.has(body.listStyle)) throw new Error("Invalid listStyle");
    out.listStyle = body.listStyle;
  }
  if (body.titleFont != null) {
    const fonts = new Set(["sans", "serif"]);
    if (!fonts.has(body.titleFont)) throw new Error("Invalid titleFont");
    out.titleFont = body.titleFont;
  }
  if (body.sortOrder != null) {
    out.sortOrder = Math.max(0, Math.min(9999, Number(body.sortOrder) || 0));
  }
  return out;
}

async function getCount(db, pageUrl) {
  const row = await db
    .prepare("SELECT like_count FROM blog_stats WHERE page_url = ?")
    .bind(pageUrl)
    .first();
  return row ? Number(row.like_count) || 0 : 0;
}

async function increment(db, pageUrl) {
  const slug = slugFromPageUrl(pageUrl);
  await db
    .prepare(
      `INSERT INTO blog_stats (page_url, slug, like_count)
       VALUES (?, ?, 1)
       ON CONFLICT(page_url) DO UPDATE SET like_count = like_count + 1`
    )
    .bind(pageUrl, slug)
    .run();
  return getCount(db, pageUrl);
}

async function handleStats(request, env) {
  const referer = request.headers.get("x-bsz-referer");
  const pageUrl = normalizePageUrl(referer, env.CANONICAL_ORIGIN);
  if (!pageUrl) {
    return jsonResponse(
      request,
      { success: false, message: "Missing or invalid x-bsz-referer header." },
      400
    );
  }
  const count =
    request.method === "POST"
      ? await increment(env.DB, pageUrl)
      : await getCount(env.DB, pageUrl);
  return jsonResponse(request, { success: true, data: { page_pv: count } });
}

async function listPublicArticles(db) {
  await publishDueScheduledArticles(db);
  const now = nowSql();
  const rows = await db
    .prepare("SELECT * FROM articles ORDER BY sort_order DESC, date DESC")
    .all();
  return (rows.results || [])
    .filter(function (row) {
      return isPubliclyVisible(row, now);
    })
    .map(function (row) {
      return rowToArticle(row, false);
    });
}

async function getPublicArticle(db, slug) {
  await publishDueScheduledArticles(db);
  const row = await db
    .prepare("SELECT * FROM articles WHERE slug = ?")
    .bind(slug)
    .first();
  const now = nowSql();
  if (!isPubliclyVisible(row, now)) return null;
  return rowToArticle(row, true);
}

function parseBoolSetting(val, fallback) {
  if (val == null || val === "") return !!fallback;
  return val === "1" || val === "true" || val === true;
}

async function getSiteSetting(db, key, defaultVal) {
  try {
    const row = await db
      .prepare("SELECT value FROM site_settings WHERE key = ?")
      .bind(key)
      .first();
    return row ? row.value : defaultVal;
  } catch {
    return defaultVal;
  }
}

async function setSiteSetting(db, key, value) {
  await db
    .prepare(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET
         value = excluded.value,
         updated_at = datetime('now')`
    )
    .bind(key, String(value))
    .run();
}

function clampIntSetting(val, min, max, fallback) {
  const n = Number(val);
  if (!isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

async function getHomeStripSettings(db) {
  const showNav = parseBoolSetting(
    await getSiteSetting(db, "home_strip_show_nav", "0"),
    false
  );
  const intervalSec = clampIntSetting(
    await getSiteSetting(db, "home_strip_interval_sec", "10"),
    2,
    60,
    10
  );
  const transitionMs = clampIntSetting(
    await getSiteSetting(db, "home_strip_transition_ms", "900"),
    400,
    2000,
    900
  );
  return {
    stripShowNav: showNav,
    stripIntervalSec: intervalSec,
    stripTransitionMs: transitionMs
  };
}

async function listHomePlacements(db) {
  await publishDueScheduledArticles(db);
  const now = nowSql();
  const rows = await db
    .prepare(
      `SELECT * FROM articles
       WHERE (home_marquee = 1 OR home_carousel = 1)
         AND status IN ('published', 'scheduled')
       ORDER BY sort_order DESC, date DESC`
    )
    .all();
  const marquee = [];
  const carousel = [];
  (rows.results || []).forEach(function (row) {
    if (!isPubliclyVisible(row, now)) return;
    const article = rowToArticle(row, false);
    if (row.home_marquee) marquee.push(article);
    if (row.home_carousel) carousel.push(article);
  });
  const stripSettings = await getHomeStripSettings(db);
  return Object.assign({ marquee: marquee, carousel: carousel }, stripSettings);
}

async function listAdminHomePlacements(db) {
  const rows = await db
    .prepare(
      `SELECT * FROM articles
       WHERE status != 'archived'
         AND (home_marquee = 1 OR home_carousel = 1)
       ORDER BY sort_order DESC, date DESC`
    )
    .all();
  const marquee = [];
  const carousel = [];
  (rows.results || []).forEach(function (row) {
    const article = rowToArticle(row, false);
    if (row.home_marquee) marquee.push(article);
    if (row.home_carousel) carousel.push(article);
  });
  const stripSettings = await getHomeStripSettings(db);
  return Object.assign(
    { marquee: marquee, carousel: carousel, preview: true },
    stripSettings
  );
}

async function handleAdminSettings(request, env, url) {
  const auth = await requireAdmin(request, env, env.DB, url.pathname);
  if (!auth.ok) {
    return jsonResponse(request, { success: false, message: auth.message }, auth.status);
  }

  if (url.pathname === "/api/admin/settings/home-strip") {
    if (request.method === "GET") {
      const settings = await getHomeStripSettings(env.DB);
      return jsonResponse(request, { success: true, data: settings });
    }
    if (request.method === "PUT") {
      const body = await readJsonBody(request);
      const stripShowNav = !!body.stripShowNav;
      const stripIntervalSec = clampIntSetting(body.stripIntervalSec, 2, 60, 10);
      const stripTransitionMs = clampIntSetting(body.stripTransitionMs, 400, 2000, 900);
      try {
        await setSiteSetting(env.DB, "home_strip_show_nav", stripShowNav ? "1" : "0");
        await setSiteSetting(env.DB, "home_strip_interval_sec", String(stripIntervalSec));
        await setSiteSetting(env.DB, "home_strip_transition_ms", String(stripTransitionMs));
      } catch (err) {
        return jsonResponse(
          request,
          {
            success: false,
            message:
              "無法寫入 site_settings（請在 D1 執行 migrate-site-settings.sql 後再試）"
          },
          500
        );
      }
      return jsonResponse(request, {
        success: true,
        data: {
          stripShowNav: stripShowNav,
          stripIntervalSec: stripIntervalSec,
          stripTransitionMs: stripTransitionMs
        }
      });
    }
  }

  return jsonResponse(request, { success: false, message: "Method not allowed" }, 405);
}

async function listAdminArticles(db) {
  const rows = await db
    .prepare("SELECT * FROM articles ORDER BY updated_at DESC")
    .all();
  return (rows.results || []).map(function (row) {
    return rowToArticle(row, false);
  });
}

async function upsertArticle(db, data) {
  await db
    .prepare(
      `INSERT INTO articles (
        slug, title, subtitle, excerpt, label, audience, category, author,
        date, read_mins, tags, cover, related_slugs, content_html, status,
        published_at, featured, home_marquee, home_carousel,
        list_style, title_font, pinned, badge_popular, badge_trending, sort_order, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(slug) DO UPDATE SET
        title=excluded.title, subtitle=excluded.subtitle, excerpt=excluded.excerpt,
        label=excluded.label, audience=excluded.audience, category=excluded.category,
        author=excluded.author, date=excluded.date, read_mins=excluded.read_mins,
        tags=excluded.tags, cover=excluded.cover, related_slugs=excluded.related_slugs,
        content_html=excluded.content_html, status=excluded.status,
        published_at=excluded.published_at, featured=excluded.featured,
        home_marquee=excluded.home_marquee, home_carousel=excluded.home_carousel,
        list_style=excluded.list_style, title_font=excluded.title_font, pinned=excluded.pinned,
        badge_popular=excluded.badge_popular, badge_trending=excluded.badge_trending,
        sort_order=excluded.sort_order, updated_at=datetime('now')`
    )
    .bind(
      data.slug,
      data.title || "",
      data.subtitle || "",
      data.excerpt || "",
      data.label || "",
      data.audience || "",
      data.category || "",
      data.author || "Mr.Bill",
      data.date || "",
      data.readMins || 5,
      JSON.stringify(data.tags || []),
      data.cover || "",
      JSON.stringify(data.relatedSlugs || []),
      data.contentHtml || "",
      data.status || "draft",
      data.publishedAt || null,
      data.featured ? 1 : 0,
      data.homeMarquee ? 1 : 0,
      data.homeCarousel ? 1 : 0,
      data.listStyle || "auto",
      data.titleFont === "serif" ? "serif" : "sans",
      data.pinned ? 1 : 0,
      data.badgePopular ? 1 : 0,
      data.badgeTrending ? 1 : 0,
      data.sortOrder || 0
    )
    .run();
}

async function handleArticlesPublic(request, env, url) {
  if (request.method !== "GET") {
    return jsonResponse(request, { success: false, message: "Method not allowed" }, 405);
  }
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length === 3 && parts[2] === "home") {
    const placements = await listHomePlacements(env.DB);
    return jsonResponse(request, { success: true, data: placements });
  }
  if (parts.length === 2) {
    const list = await listPublicArticles(env.DB);
    return jsonResponse(request, { success: true, data: { articles: list } });
  }
  const slug = parts[2];
  if (!isValidSlug(slug)) {
    return jsonResponse(request, { success: false, message: "Invalid slug" }, 400);
  }
  const article = await getPublicArticle(env.DB, slug);
  if (!article) {
    return jsonResponse(request, { success: false, message: "Not found" }, 404);
  }
  return jsonResponse(request, { success: true, data: { article: article } });
}

async function handleArticlesAdmin(request, env, url) {
  const auth = await requireAdmin(request, env, env.DB, url.pathname);
  if (!auth.ok) {
    return jsonResponse(request, { success: false, message: auth.message }, auth.status);
  }

  const parts = url.pathname.split("/").filter(Boolean);
  const slug = parts[3];

  if (request.method === "GET" && parts.length === 3) {
    const list = await listAdminArticles(env.DB);
    return jsonResponse(request, { success: true, data: { articles: list } });
  }

  if (request.method === "GET" && parts.length === 4 && parts[3] === "home") {
    const placements = await listAdminHomePlacements(env.DB);
    return jsonResponse(request, { success: true, data: placements });
  }

  if (request.method === "GET" && parts.length === 4) {
    if (!isValidSlug(slug)) {
      return jsonResponse(request, { success: false, message: "Invalid slug" }, 400);
    }
    const row = await env.DB.prepare("SELECT * FROM articles WHERE slug = ?")
      .bind(slug)
      .first();
    if (!row) return jsonResponse(request, { success: false, message: "Not found" }, 404);
    return jsonResponse(request, {
      success: true,
      data: { article: rowToArticle(row, true) }
    });
  }

  if (request.method === "POST" && parts.length === 3) {
    const body = await readJsonBody(request);
    const data = normalizeArticleInput(body, {
      status: "draft",
      author: "Mr.Bill",
      readMins: 5,
      tags: [],
      relatedSlugs: []
    });
    if (!data.slug) throw new Error("Slug required");
    await upsertArticle(env.DB, data);
    return jsonResponse(request, { success: true, data: { slug: data.slug } }, 201);
  }

  if (request.method === "PUT" && parts.length === 4) {
    if (!isValidSlug(slug)) {
      return jsonResponse(request, { success: false, message: "Invalid slug" }, 400);
    }
    const existing = await env.DB.prepare("SELECT * FROM articles WHERE slug = ?")
      .bind(slug)
      .first();
    if (!existing) {
      return jsonResponse(request, { success: false, message: "Not found" }, 404);
    }
    const body = await readJsonBody(request);
    body.slug = slug;
    const data = normalizeArticleInput(body, rowToArticle(existing, true));
    await upsertArticle(env.DB, data);
    return jsonResponse(request, { success: true, data: { slug: slug } });
  }

  if (request.method === "DELETE" && parts.length === 4) {
    if (!isValidSlug(slug)) {
      return jsonResponse(request, { success: false, message: "Invalid slug" }, 400);
    }
    if (LEGACY_STATIC_SLUGS.has(slug)) {
      return jsonResponse(request, { success: false, message: "Legacy slug protected" }, 403);
    }
    const row = await env.DB.prepare("SELECT status FROM articles WHERE slug = ?")
      .bind(slug)
      .first();
    if (!row) {
      return jsonResponse(request, { success: false, message: "Not found" }, 404);
    }
    const purge = url.searchParams.get("purge") === "1";
    if (purge) {
      if (row.status === "published" || row.status === "scheduled") {
        return jsonResponse(
          request,
          { success: false, message: "已上架或排程中的文章請先下架" },
          400
        );
      }
      await env.DB.prepare("DELETE FROM articles WHERE slug = ?").bind(slug).run();
      return jsonResponse(request, { success: true, data: { purged: true } });
    }
    await env.DB.prepare(
      "UPDATE articles SET status='archived', updated_at=datetime('now') WHERE slug=?"
    )
      .bind(slug)
      .run();
    return jsonResponse(request, { success: true, data: { archived: true } });
  }

  return jsonResponse(request, { success: false, message: "Method not allowed" }, 405);
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      publishDueScheduledArticles(env.DB).then(function (count) {
        if (count > 0) {
          console.log("Published " + count + " scheduled article(s)");
        }
      })
    );
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    try {
      if (url.pathname === "/ping") {
        return jsonResponse(request, { ok: true });
      }

      if (url.pathname === "/api") {
        return await handleStats(request, env);
      }

      if (url.pathname === "/api/articles" || url.pathname.startsWith("/api/articles/")) {
        return await handleArticlesPublic(request, env, url);
      }

      if (url.pathname.startsWith("/api/admin/articles")) {
        return await handleArticlesAdmin(request, env, url);
      }

      if (url.pathname.startsWith("/api/admin/settings")) {
        return await handleAdminSettings(request, env, url);
      }

      return jsonResponse(request, { success: false, message: "Not found" }, 404);
    } catch (err) {
      const msg = err && err.message ? err.message : "Server error";
      const status = msg.indexOf("Payload") >= 0 ? 413 : 400;
      return jsonResponse(request, { success: false, message: msg }, status);
    }
  }
};

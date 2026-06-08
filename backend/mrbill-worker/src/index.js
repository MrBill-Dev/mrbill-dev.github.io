const ALLOWED_ORIGINS = [
  "https://mrbill-dev.github.io",
  "https://plan.get.com.tw",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept, x-bsz-referer",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin"
  };
}

function jsonResponse(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(request)
    }
  });
}

function normalizePageUrl(referer, canonicalOrigin) {
  if (!referer) return "";
  try {
    const url = new URL(referer.trim());
    const path = url.pathname.replace(/\/+$/, "");
    const origin = (canonicalOrigin || "https://mrbill-dev.github.io").replace(/\/+$/, "");
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (url.pathname === "/ping") {
      return jsonResponse(request, { ok: true });
    }

    if (url.pathname !== "/api") {
      return jsonResponse(request, { success: false, message: "Not found" }, 404);
    }

    const referer = request.headers.get("x-bsz-referer");
    const pageUrl = normalizePageUrl(referer, env.CANONICAL_ORIGIN);

    if (!pageUrl) {
      return jsonResponse(
        request,
        { success: false, message: "Missing or invalid x-bsz-referer header." },
        400
      );
    }

    try {
      const count =
        request.method === "POST"
          ? await increment(env.DB, pageUrl)
          : await getCount(env.DB, pageUrl);

      return jsonResponse(request, { success: true, data: { page_pv: count } });
    } catch (err) {
      return jsonResponse(
        request,
        { success: false, message: err && err.message ? err.message : "Server error" },
        500
      );
    }
  }
};

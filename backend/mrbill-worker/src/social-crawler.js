import { buildPublishedArticlePageHtml } from "./article-page-html.js";

const CRAWLER_UA_RE =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Line\/|Pinterest|Googlebot-Image|bingpreview/i;

export function isSocialCrawler(request) {
  const ua = request.headers.get("User-Agent") || "";
  return CRAWLER_UA_RE.test(ua);
}

/** 爬蟲請求：回傳含靜態 OG 的完整文章殼層 HTML */
export async function crawlerOgResponse(article) {
  const html = buildPublishedArticlePageHtml(article);
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Accept-Ranges": "none",
      Vary: "User-Agent"
    }
  });
}

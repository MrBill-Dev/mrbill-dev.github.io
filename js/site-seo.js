/**
 * 全站 SEO 執行層（設定來源：js/site-seo.config.json）
 *
 * 靜態 <meta> 由 scripts/sync-seo-meta.mjs 寫入各頁 HTML，爬蟲無需 JS。
 * 此檔供執行期覆寫（如部落格動態更新）與工具函式共用。
 *
 * 維護流程：
 *   1. 改 js/site-seo.config.json（一般頁面）或 js/blog-articles.js（文章）
 *   2. 執行 node scripts/sync-seo-meta.mjs
 *   3. 部署
 */
(function (global) {
  "use strict";

  var cfg = global.__MRBILL_SEO_CONFIG__ || { site: {}, pages: {} };
  var MRBILL_SITE_SEO = cfg.site || {};
  var MRBILL_SITE_SEO_PAGES = cfg.pages || {};

  function normalizePath(pathname) {
    var p = (pathname || "/").replace(/\\/g, "/");
    if (!p.startsWith("/")) p = "/" + p;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p.toLowerCase();
  }

  function currentPathname() {
    return normalizePath((global.location && global.location.pathname) || "/");
  }

  function pageFileName() {
    var p = currentPathname();
    var base = p.split("/").pop();
    return base || "index.html";
  }

  function isBlogArticlePath() {
    return (
      /\/blog\/[^/]+\.html$/i.test(currentPathname()) &&
      !/\/blog\/index\.html$/i.test(currentPathname())
    );
  }

  function isBlogIndexPath() {
    var p = currentPathname();
    return p === "/blog" || p === "/blog/index.html";
  }

  function resolvePageId(explicitId) {
    if (explicitId) return explicitId;
    var html = document.documentElement;
    if (html && html.dataset && html.dataset.seoPage) {
      return html.dataset.seoPage;
    }
    var p = currentPathname();
    if (p === "/" || p === "/index.html") return "home";
    if (isBlogIndexPath()) return "blog-index";
    if (isBlogArticlePath()) return null;
    var file = pageFileName().replace(/\.html$/i, "");
    if (MRBILL_SITE_SEO_PAGES[file]) return file;
    return null;
  }

  function absUrl(pathOrUrl) {
    if (!pathOrUrl) return "";
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    var origin = (MRBILL_SITE_SEO.origin || "").replace(/\/$/, "");
    return origin + "/" + String(pathOrUrl).replace(/^\//, "");
  }

  function pageCanonicalUrl(pageConfig) {
    if (pageConfig && pageConfig.canonical) return absUrl(pageConfig.canonical);
    if (pageConfig && pageConfig.path) {
      var path = pageConfig.path;
      if (path === "/") return MRBILL_SITE_SEO.origin + "/";
      return absUrl(path);
    }
    var path = currentPathname();
    if (path === "/index.html") path = "/";
    return MRBILL_SITE_SEO.origin + (path === "/" ? "/" : path);
  }

  function truncateText(text, max) {
    if (!text) return "";
    var t = String(text).replace(/\s+/g, " ").trim();
    if (t.length <= max) return t;
    return t.slice(0, max - 1).trim() + "…";
  }

  function pickText(el) {
    return el ? truncateText(el.textContent, 320) : "";
  }

  function detectFromDom() {
    var main = document.querySelector("main") || document.body;
    var h1 = main ? main.querySelector("h1") : null;
    var firstP = main ? main.querySelector("p") : null;
    var metaDesc = document.querySelector('meta[name="description"]');
    var title = (document.title || "").split("|")[0].split("｜")[0].trim();
    if (!title) title = pickText(h1) || title;
    var description =
      (metaDesc && metaDesc.getAttribute("content")) ||
      pickText(firstP) ||
      MRBILL_SITE_SEO.defaultDescription;
    var image = "";
    if (main) {
      var img = main.querySelector("img[src]");
      if (img && img.getAttribute("src")) image = img.getAttribute("src");
    }
    return {
      title: title,
      description: truncateText(description, 160),
      ogImage: image,
      type: isBlogArticlePath() ? "article" : "website"
    };
  }

  function titleEndsWithSiteBrand(title) {
    if (!title) return false;
    var suffix = String(
      MRBILL_SITE_SEO.titleSuffix || MRBILL_SITE_SEO.siteName || ""
    ).trim();
    var name = String(MRBILL_SITE_SEO.siteName || "").trim();
    var t = String(title).trim();
    function endsWithBrand(brand) {
      if (!brand) return false;
      return (
        t.endsWith(brand) ||
        t.endsWith("｜" + brand) ||
        t.endsWith(" — " + brand) ||
        t.endsWith(" - " + brand)
      );
    }
    return endsWithBrand(suffix) || (name !== suffix && endsWithBrand(name));
  }

  function formatDocumentTitle(title, options) {
    options = options || {};
    if (!title) return MRBILL_SITE_SEO.siteName;
    if (options.rawTitle) return title;
    if (titleEndsWithSiteBrand(title)) return title;
    var suffix =
      options.titleSuffix ||
      MRBILL_SITE_SEO.titleSuffix ||
      MRBILL_SITE_SEO.siteName;
    if (title.indexOf("｜") !== -1 || title.indexOf("|") !== -1) {
      return title + " — " + suffix;
    }
    return title + "｜" + suffix;
  }

  function mergeSeoConfig(pageId, overrides) {
    var base = {
      type: "website",
      title: "",
      description: MRBILL_SITE_SEO.defaultDescription,
      ogTitle: "",
      ogDescription: "",
      ogImage: MRBILL_SITE_SEO.defaultOgImage,
      ogImageWidth: MRBILL_SITE_SEO.defaultOgImageWidth,
      ogImageHeight: MRBILL_SITE_SEO.defaultOgImageHeight,
      ogImageAlt: MRBILL_SITE_SEO.defaultOgImageAlt,
      twitterDescription: "",
      canonical: "",
      jsonLd: null,
      rawTitle: false,
      skipOrganization: false
    };
    var registry = pageId ? MRBILL_SITE_SEO_PAGES[pageId] : null;
    var merged = Object.assign({}, base, registry || {}, overrides || {});
    var dom = detectFromDom();

    if (!merged.title) merged.title = dom.title;
    if (!merged.description) merged.description = dom.description;
    if (!merged.ogTitle) merged.ogTitle = merged.title;
    if (!merged.ogDescription) merged.ogDescription = merged.description;
    if (!merged.twitterDescription) {
      merged.twitterDescription = merged.ogDescription || merged.description;
    }
    if (!merged.ogImage) merged.ogImage = dom.ogImage || MRBILL_SITE_SEO.defaultOgImage;
    if (!merged.canonical) merged.canonical = pageCanonicalUrl(registry || merged);

    return merged;
  }

  function setMeta(name, content, attr) {
    if (content == null || content === "") return;
    attr = attr || "name";
    var el =
      document.querySelector("meta[" + attr + '="' + name + '"]') ||
      document.createElement("meta");
    el.setAttribute(attr, name);
    el.setAttribute("content", content);
    if (!el.parentNode) document.head.appendChild(el);
  }

  function setLink(rel, href, extraAttrs) {
    if (!href) return;
    var el = document.querySelector('link[rel="' + rel + '"]');
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    if (extraAttrs) {
      Object.keys(extraAttrs).forEach(function (key) {
        el.setAttribute(key, extraAttrs[key]);
      });
    }
  }

  function setJsonLd(data, id) {
    if (!data) return;
    id = id || "site-seo-jsonld";
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    var payload = Object.assign({}, data);
    if (
      payload["@type"] === "EducationalOrganization" ||
      payload["@type"] === "Organization"
    ) {
      payload.name = payload.name || MRBILL_SITE_SEO.siteName;
      payload.url = payload.url || MRBILL_SITE_SEO.origin + "/";
    }
    el.textContent = JSON.stringify(payload, null, 2);
  }

  function preloadImage(path) {
    if (!path) return;
    var href = absUrl(path);
    if (document.querySelector('link[data-site-seo-preload="1"]')) return;
    var link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.setAttribute("data-site-seo-preload", "1");
    document.head.appendChild(link);
  }

  function applySiteSeo(overrides) {
    if (typeof document === "undefined" || !document.head) return null;

    overrides = overrides || {};
    var pageId = resolvePageId(overrides.pageId);
    var inline = global.MRBILL_PAGE_SEO || {};
    var config = mergeSeoConfig(pageId, Object.assign({}, inline, overrides));

    var docTitle = formatDocumentTitle(config.title, config);
    document.title = docTitle;

    setLink("canonical", pageCanonicalUrl(config));
    preloadImage(config.ogImage);

    setMeta("description", config.description);
    if (config.type === "article") {
      setMeta("robots", "index,follow,max-image-preview:large");
    }
    setMeta("og:type", config.type, "property");
    setMeta("og:site_name", MRBILL_SITE_SEO.siteName, "property");
    setMeta("og:locale", MRBILL_SITE_SEO.locale, "property");
    setMeta("og:title", config.ogTitle || config.title, "property");
    setMeta("og:description", config.ogDescription, "property");
    setMeta("og:url", pageCanonicalUrl(config), "property");
    setMeta("og:image", absUrl(config.ogImage), "property");
    setMeta("og:image:width", String(config.ogImageWidth), "property");
    setMeta("og:image:height", String(config.ogImageHeight), "property");
    setMeta("og:image:alt", config.ogImageAlt, "property");

    setMeta("twitter:card", MRBILL_SITE_SEO.twitterCard);
    setMeta("twitter:title", config.ogTitle || config.title);
    setMeta("twitter:description", config.twitterDescription);
    setMeta("twitter:image", absUrl(config.ogImage));

    if (!config.skipOrganization) {
      setJsonLd(config.jsonLd || MRBILL_SITE_SEO.organization);
    }

    return config;
  }

  global.MRBILL_SITE_SEO = MRBILL_SITE_SEO;
  global.MRBILL_SITE_SEO_PAGES = MRBILL_SITE_SEO_PAGES;
  global.applySiteSeo = applySiteSeo;
  global.mrbillSeoAbsUrl = absUrl;
  global.mrbillSeoSetMeta = setMeta;
  global.mrbillSeoSetLink = setLink;
  global.mrbillSeoSetJsonLd = setJsonLd;
})(typeof window !== "undefined" ? window : this);

function isBlogSectionPath() {
    var p = (window.location.pathname || '').replace(/\\/g, '/').toLowerCase();
    return /\/blog(\/|$)/.test(p) || p.endsWith('/blog');
}

/** 文章分享高亮僅在 /blog/ 底下；其他頁面的 explicitId 不會誤亮 nav-articles */
function resolveActiveNavId(explicitId) {
    if (isBlogSectionPath()) {
        return 'nav-articles';
    }
    if (!explicitId || explicitId === 'nav-articles') {
        return null;
    }
    return explicitId;
}

var NAV_DESKTOP_ACTIVE = ['bg-gradient-to-r', 'from-indigo-600', 'to-cyan-500', 'text-white', 'font-black', 'shadow-lg', 'shadow-indigo-200/50'];
var NAV_DESKTOP_IDLE = ['text-slate-600', 'hover:bg-slate-50', 'hover:bg-white', 'hover:text-indigo-600', 'hover:shadow-md', 'hover:-translate-y-0.5'];
var NAV_MOBILE_ACTIVE = ['bg-indigo-50', 'text-indigo-800', 'font-black', 'ring-1', 'ring-indigo-200'];
var NAV_MOBILE_IDLE = ['text-slate-600', 'hover:bg-slate-50'];

function clearNavClasses(el) {
    NAV_DESKTOP_ACTIVE.concat(NAV_DESKTOP_IDLE, NAV_MOBILE_ACTIVE, NAV_MOBILE_IDLE).forEach(function (c) {
        el.classList.remove(c);
    });
}

function setNavIdle(el) {
    if (el.classList.contains('mobile-nav-top') || el.classList.contains('mobile-nav-sub')) {
        NAV_MOBILE_IDLE.forEach(function (c) { el.classList.add(c); });
    } else if (el.classList.contains('nav-btn')) {
        NAV_DESKTOP_IDLE.forEach(function (c) { el.classList.add(c); });
    }
}

function setNavActive(el) {
    if (el.classList.contains('mobile-nav-top') || el.classList.contains('mobile-nav-sub')) {
        NAV_MOBILE_ACTIVE.forEach(function (c) { el.classList.add(c); });
    } else {
        NAV_DESKTOP_ACTIVE.forEach(function (c) { el.classList.add(c); });
        if (el.tagName === 'BUTTON') {
            el.classList.add('text-white');
        }
    }
}

/** 主選單目前頁面高亮：桌機漸層、手機淺底；文章分享僅在 /blog/ */
function applyGlobalNavActive(explicitId) {
    var navId = resolveActiveNavId(explicitId);

    document.querySelectorAll('#global-header .nav-btn, #global-header .mobile-nav-top, #global-header .mobile-nav-sub, #global-header [data-nav-articles]').forEach(function (el) {
        clearNavClasses(el);
        setNavIdle(el);
    });

    if (!navId) return;

    if (navId === 'nav-articles') {
        document.querySelectorAll('#nav-articles, [data-nav-articles]').forEach(function (el) {
            clearNavClasses(el);
            setNavActive(el);
        });
        return;
    }

    var main = document.getElementById(navId);
    if (main) {
        clearNavClasses(main);
        setNavActive(main);
    }
    document.querySelectorAll('[data-nav-match="' + navId + '"]').forEach(function (el) {
        clearNavClasses(el);
        setNavActive(el);
    });
}
window.applyGlobalNavActive = applyGlobalNavActive;

/** 將 HTML 片段內的 <script> 注入 head（innerHTML 不會執行 script） */
function injectHtmlScripts(html, target) {
    var mount = target || document.head;
    var tpl = document.createElement('div');
    tpl.innerHTML = html;
    tpl.querySelectorAll('script').forEach(function (oldScript) {
        var s = document.createElement('script');
        if (oldScript.src) {
            s.async = oldScript.async;
            s.src = oldScript.src;
        } else {
            s.textContent = oldScript.textContent;
        }
        mount.appendChild(s);
    });
}

/** 載入 components/site-analytics.html（GA4）；由 footer 載入時觸發，全站共用 */
async function loadSiteAnalyticsScripts(footerFilePath) {
    if (window.__siteAnalyticsLoaded) return;
    window.__siteAnalyticsLoaded = true;
    var base = footerFilePath.replace(/[^/]+$/, '');
    try {
        var response = await fetch(base + 'site-analytics.html');
        if (!response.ok) return;
        injectHtmlScripts(await response.text(), document.head);
    } catch (_) {}
}
window.loadSiteAnalyticsScripts = loadSiteAnalyticsScripts;

function getSiteJsHref(fileName) {
    if (isBlogSectionPath()) return '../js/' + fileName;
    return 'js/' + fileName;
}

function loadSiteScriptOnce(fileName) {
    var href = getSiteJsHref(fileName);
    return new Promise(function (resolve, reject) {
        if (typeof syncBlogNavNewIndicator === 'function') {
            resolve();
            return;
        }
        var existing = document.querySelector('script[data-site-script="' + fileName + '"]');
        if (existing) {
            existing.addEventListener('load', function () { resolve(); });
            existing.addEventListener('error', reject);
            return;
        }
        var s = document.createElement('script');
        s.src = href;
        s.async = true;
        s.dataset.siteScript = fileName;
        s.onload = function () { resolve(); };
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

/** 載入 blog-articles.js 後同步導覽紅點（依個人未讀狀態） */
function initBlogNavNewIndicator() {
    if (typeof syncBlogNavNewIndicator === 'function') {
        syncBlogNavNewIndicator();
        return;
    }
    loadSiteScriptOnce('blog-articles.js')
        .then(function () {
            if (typeof syncBlogNavNewIndicator === 'function') {
                syncBlogNavNewIndicator();
            }
        })
        .catch(function () {});
}

async function includeComponentSlot(elementId, filePath, activeNavId, callback) {
    const container = document.getElementById(elementId);
    if (!container) return;
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`組件遺失: ${filePath}`);
        container.innerHTML = await response.text();
        if (elementId === 'global-header') {
            applyGlobalNavActive(activeNavId);
            initBlogNavNewIndicator();
        }
        if (elementId === 'global-footer') {
            loadSiteAnalyticsScripts(filePath);
        }
        initNavMegaMenus();
        if (callback) callback();
    } catch (e) {
        console.error(e);
        // 讓呼叫端有機會做降級處理（例如先渲染預設內容）
        if (callback) callback(e);
    }
}

/** 導覽下拉：hover 保留間隙、延遲關閉，並支援點擊開關 */
function initNavMegaMenus() {
    document.querySelectorAll('[data-nav-dropdown]').forEach(function(wrap) {
        if (wrap.dataset.navInit === '1') return;
        wrap.dataset.navInit = '1';

        var trigger = wrap.querySelector('[data-nav-trigger]');
        var panel = wrap.querySelector('[data-nav-panel]');
        if (!trigger || !panel) return;

        var closeTimer = null;
        function setOpen(open) {
            clearTimeout(closeTimer);
            panel.classList.toggle('opacity-0', !open);
            panel.classList.toggle('invisible', !open);
            panel.classList.toggle('pointer-events-none', !open);
            panel.classList.toggle('opacity-100', open);
            panel.classList.toggle('visible', open);
            panel.classList.toggle('pointer-events-auto', open);
            trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        function scheduleClose() {
            closeTimer = setTimeout(function() { setOpen(false); }, 280);
        }

        wrap.addEventListener('mouseenter', function() { setOpen(true); });
        wrap.addEventListener('mouseleave', scheduleClose);
        panel.addEventListener('mouseenter', function() { clearTimeout(closeTimer); });
        panel.addEventListener('mouseleave', scheduleClose);

        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            setOpen(trigger.getAttribute('aria-expanded') !== 'true');
        });

        document.addEventListener('click', function(e) {
            if (!wrap.contains(e.target)) scheduleClose();
        });
    });
}

window.initNavMegaMenus = initNavMegaMenus;

/** 捲動至主內容區（手機點側欄章節後用） */
function scrollToContentAnchor(options) {
    options = options || {};
    var el = document.getElementById(options.anchorId);
    if (!el) return;
    var offset = options.offset;
    if (offset == null) {
        offset = window.matchMedia('(max-width: 1023px)').matches ? 76 : 96;
    }
    requestAnimationFrame(function() {
        var top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
}
window.scrollToContentAnchor = scrollToContentAnchor;

/** 全站 RWD：避免橫向溢出、長字與表格撐破版面 */
function injectSiteRwdStyles() {
    if (document.getElementById('site-rwd-styles')) return;
    var style = document.createElement('style');
    style.id = 'site-rwd-styles';
    style.textContent = [
        'html, body { overflow-x: hidden; }',
        '.site-prose-safe { overflow-wrap: anywhere; word-break: break-word; }',
        '.site-prose-safe pre, .site-prose-safe code { max-width: 100%; }',
        '.site-prose-safe pre { overflow-x: auto; -webkit-overflow-scrolling: touch; }',
        '.site-prose-safe table { display: block; max-width: 100%; overflow-x: auto; }',
        '.site-prose-safe img, .site-prose-safe video { max-width: 100%; height: auto; }',
        '#mobile-content-dock { transition: opacity 0.22s ease, transform 0.22s ease; }',
        '#mobile-content-dock.is-hidden { opacity: 0; pointer-events: none; transform: translateY(10px); }',
        '@media (max-width: 1023px) { body.has-mobile-dock.is-mobile-dock-visible { padding-bottom: 5.5rem; } }',
        '.nav-mega-grid .nav-mega-card { min-height: 5.25rem; display: flex; flex-direction: column; justify-content: center; }',
        '[data-nav-articles].nav-articles--has-new { position: relative; }',
        '.nav-articles-new-badge { position: absolute; display: inline-flex; align-items: center; justify-content: center; min-width: 1.125rem; height: 1.125rem; padding: 0 0.3rem; border-radius: 9999px; background: #f43f5e; color: #fff; font-size: 0.625rem; font-weight: 900; line-height: 1; letter-spacing: -0.02em; box-shadow: 0 0 0 2px rgba(255,255,255,0.95); pointer-events: none; top: 0.1rem; right: -0.2rem; }',
        '.mobile-nav-top.nav-articles--has-new .nav-articles-new-badge { top: 50%; right: 0.75rem; transform: translateY(-50%); }',
        '@media (prefers-reduced-motion: no-preference) { .nav-articles-new-badge { animation: nav-articles-new-pulse 2.4s ease-in-out infinite; } }',
        '@keyframes nav-articles-new-pulse { 0%, 100% { box-shadow: 0 0 0 2px rgba(255,255,255,0.95); } 50% { box-shadow: 0 0 0 2px rgba(255,255,255,0.95), 0 0 0 4px rgba(244,63,94,0.28); } }',
        '.blog-top-btn { position: fixed; right: 1rem; bottom: 1.25rem; z-index: 45; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.125rem; width: 3.25rem; height: 3.25rem; border: none; border-radius: 9999px; background: linear-gradient(160deg, #4f46e5 0%, #4338ca 100%); color: #fff; box-shadow: 0 6px 18px rgba(79, 70, 229, 0.38); cursor: pointer; opacity: 0; transform: translateY(0.75rem) scale(0.92); pointer-events: none; transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease, background 0.2s ease; }',
        '.blog-top-btn.is-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }',
        '.blog-top-btn:hover { background: linear-gradient(160deg, #4338ca 0%, #3730a3 100%); box-shadow: 0 8px 22px rgba(79, 70, 229, 0.45); transform: translateY(-2px) scale(1.02); }',
        '.blog-top-btn__text { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.12em; line-height: 1; }',
        '.blog-top-btn__icon { display: inline-flex; line-height: 0; }',
        '@media (max-width: 1023px) { body.has-mobile-dock.is-mobile-dock-visible .blog-top-btn { bottom: 5.75rem; } }',
        '@media (max-width: 639px) { .blog-top-btn { right: 0.875rem; bottom: 1rem; width: 3rem; height: 3rem; } }',
        '@media (prefers-reduced-motion: reduce) { .blog-top-btn { transition: opacity 0.15s ease; } .blog-top-btn:hover { transform: none; } }'
    ].join('\n');
    document.head.appendChild(style);
}
injectSiteRwdStyles();

/**
 * 手機版：捲到側欄時顯示固定「回到內容」列（可帶縮圖）
 * options: { anchorId, label, getThumbUrl }
 */
function initMobileContentDock(options) {
    options = options || {};
    var anchorId = options.anchorId;
    var anchor = document.getElementById(anchorId);
    if (!anchor || document.getElementById('mobile-content-dock')) return;

    var dock = document.createElement('div');
    dock.id = 'mobile-content-dock';
    dock.className = 'fixed bottom-4 left-4 right-4 z-40 lg:hidden is-hidden';
    dock.innerHTML = [
        '<button type="button" class="mobile-dock-btn w-full flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-xl px-3 py-2.5 text-left">',
        '  <img class="mobile-dock-thumb w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100" alt="" loading="lazy" />',
        '  <span class="flex-1 min-w-0">',
        '    <span class="mobile-dock-label block font-black text-slate-900 text-sm truncate">' + (options.label || '回到課程內容') + '</span>',
        '    <span class="block text-xs text-indigo-600 font-bold mt-0.5">點此回到上方閱讀區 ↑</span>',
        '  </span>',
        '</button>'
    ].join('');

    document.body.appendChild(dock);
    document.body.classList.add('has-mobile-dock');
    var btn = dock.querySelector('.mobile-dock-btn');
    var thumb = dock.querySelector('.mobile-dock-thumb');

    function refreshThumb() {
        if (typeof options.getThumbUrl === 'function') {
            var url = options.getThumbUrl();
            if (url) {
                thumb.src = url;
                thumb.classList.remove('hidden');
                return;
            }
        }
        thumb.classList.add('hidden');
    }

    btn.addEventListener('click', function() {
        scrollToContentAnchor({ anchorId: anchorId, offset: options.offset });
    });

    function syncDockVisibility() {
        var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
        if (isDesktop) {
            dock.classList.add('is-hidden');
            document.body.classList.remove('is-mobile-dock-visible');
            return;
        }
        var rect = anchor.getBoundingClientRect();
        var headerRoom = options.offset != null ? options.offset : 88;
        var anchorVisible = rect.top < window.innerHeight - headerRoom && rect.bottom > headerRoom;
        dock.classList.toggle('is-hidden', anchorVisible);
        document.body.classList.toggle('is-mobile-dock-visible', !anchorVisible);
        if (!anchorVisible) refreshThumb();
    }

    window.addEventListener('scroll', syncDockVisibility, { passive: true });
    window.addEventListener('resize', syncDockVisibility, { passive: true });
    syncDockVisibility();
}
window.initMobileContentDock = initMobileContentDock;

function initSidebarKeywordSearch(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (container.querySelector('[data-sidebar-search="true"]')) return;

    const buttonSelector = (options && options.buttonSelector) || 'button';
    const placeholder = (options && options.placeholder) || '搜尋關鍵字...';

    const searchWrap = document.createElement('div');
    searchWrap.setAttribute('data-sidebar-search', 'true');
    searchWrap.className = 'sticky top-0 z-10 bg-white pb-3';
    searchWrap.innerHTML = `
      <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">快速搜尋</label>
      <input
        type="text"
        class="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
        placeholder="${placeholder}"
      />
    `;

    container.prepend(searchWrap);
    const input = searchWrap.querySelector('input');
    const sections = Array.from(container.children).filter(function(el) {
        return el !== searchWrap;
    });
    const allButtons = Array.from(container.querySelectorAll(buttonSelector));

    function runFilter() {
        const keyword = (input.value || '').trim().toLowerCase();
        allButtons.forEach(function(btn) {
            const hit = !keyword || btn.textContent.toLowerCase().includes(keyword);
            btn.style.display = hit ? '' : 'none';
        });

        sections.forEach(function(section) {
            const btns = section.querySelectorAll(buttonSelector);
            if (!btns.length) return;
            const hasVisible = Array.from(btns).some(function(btn) {
                return btn.style.display !== 'none';
            });
            section.style.display = hasVisible ? '' : 'none';
        });
    }

    input.addEventListener('input', runFilter);
}

/** 全站錨點平滑捲動：統一處理 a[href*="#"] */
function getGlobalScrollOffset() {
    var header = document.getElementById('global-header');
    var headerHeight = header ? header.getBoundingClientRect().height : 80;
    return Math.max(72, Math.round(headerHeight + 12));
}

function scrollToHashTarget(hash, updateHistory) {
    if (!hash || hash === '#') return false;
    var id = decodeURIComponent(hash.replace(/^#/, ''));
    if (!id) return false;
    var target = document.getElementById(id);
    if (!target) return false;
    var top = target.getBoundingClientRect().top + window.scrollY - getGlobalScrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    if (updateHistory) history.pushState(null, '', '#' + encodeURIComponent(id));
    return true;
}

function initGlobalAnchorSmoothScroll() {
    if (document.body && document.body.dataset.anchorSmoothInit === '1') return;
    if (document.body) document.body.dataset.anchorSmoothInit = '1';

    document.addEventListener('click', function(e) {
        var anchor = e.target.closest('a[href]');
        if (!anchor) return;
        var rawHref = anchor.getAttribute('href') || '';
        if (!rawHref || rawHref === '#') return;

        var url;
        try {
            url = new URL(rawHref, window.location.href);
        } catch (_) {
            return;
        }

        var isSamePage = url.origin === window.location.origin &&
            url.pathname === window.location.pathname &&
            url.search === window.location.search;
        if (!isSamePage || !url.hash) return;

        if (scrollToHashTarget(url.hash, true)) {
            e.preventDefault();
        }
    });

    window.addEventListener('load', function() {
        if (!window.location.hash) return;
        // 等組件/內容渲染完成後再滾動，避免定位偏差
        setTimeout(function() {
            scrollToHashTarget(window.location.hash, false);
        }, 80);
    });
}

function sitePrefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

/** 全站回到頂部（與文章頁 TOP 按鈕同款） */
function initSiteBackToTop() {
    var existing = document.getElementById('blog-back-to-top');
    if (existing) return existing;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'blog-back-to-top';
    btn.className = 'blog-top-btn';
    btn.setAttribute('aria-label', '回到頁首');
    btn.innerHTML =
        '<span class="blog-top-btn__icon" aria-hidden="true"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg></span><span class="blog-top-btn__text">TOP</span>';

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: sitePrefersReducedMotion() ? 'auto' : 'smooth' });
    });

    document.body.appendChild(btn);

    var toggle = function() {
        if (window.scrollY > 360) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    };

    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
    return btn;
}
window.initSiteBackToTop = initSiteBackToTop;

function bootSiteBackToTop() {
    initSiteBackToTop();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSiteBackToTop);
} else {
    bootSiteBackToTop();
}

initGlobalAnchorSmoothScroll();
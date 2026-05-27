async function includeComponentSlot(elementId, filePath, activeNavId, callback) {
    const container = document.getElementById(elementId);
    if (!container) return;
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`組件遺失: ${filePath}`);
        container.innerHTML = await response.text();
        if (activeNavId) {
            const activeLink = document.getElementById(activeNavId);
            if (activeLink) {
                activeLink.classList.remove('text-slate-600', 'hover:bg-slate-50', 'hover:bg-white', 'hover:text-indigo-600', 'hover:shadow-md', 'hover:-translate-y-0.5');
                activeLink.classList.add('bg-gradient-to-r', 'from-indigo-600', 'to-cyan-500', 'text-white', 'font-black', 'shadow-lg', 'shadow-indigo-200/50');
            }
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
        'html, body { overflow-x: clip; }',
        '.site-prose-safe { overflow-wrap: anywhere; word-break: break-word; }',
        '.site-prose-safe pre, .site-prose-safe code { max-width: 100%; }',
        '.site-prose-safe pre { overflow-x: auto; -webkit-overflow-scrolling: touch; }',
        '.site-prose-safe table { display: block; max-width: 100%; overflow-x: auto; }',
        '.site-prose-safe img, .site-prose-safe video { max-width: 100%; height: auto; }',
        '#mobile-content-dock { transition: opacity 0.22s ease, transform 0.22s ease; }',
        '#mobile-content-dock.is-hidden { opacity: 0; pointer-events: none; transform: translateY(10px); }',
        '@media (max-width: 1023px) { body.has-mobile-dock { padding-bottom: 5.5rem; } }'
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
            return;
        }
        var rect = anchor.getBoundingClientRect();
        var headerRoom = options.offset != null ? options.offset : 88;
        var anchorVisible = rect.top < window.innerHeight - headerRoom && rect.bottom > headerRoom;
        dock.classList.toggle('is-hidden', anchorVisible);
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
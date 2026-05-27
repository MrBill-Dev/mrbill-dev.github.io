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
    } catch (e) { console.error(e); }
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
/**
 * 課程頁側欄：捲過主視覺後 desktop fixed + mobile drawer
 * initCourseSidebarDock({ sidebarId, colId, spacerId, openBtnId, closeBtnId, backdropId })
 */
(function (global) {
  function initCourseSidebarDock(cfg) {
    cfg = Object.assign({
      sidebarId: 'tutorial-sidebar',
      colId: 'tutorial-sidebar-col',
      spacerId: 'tutorial-sidebar-spacer',
      heroSelector: '.tutorial-hero',
      openBtnId: 'tutorial-sidebar-open',
      closeBtnId: 'tutorial-sidebar-close',
      backdropId: 'tutorial-sidebar-backdrop',
      navOpenClass: 'tutorial-nav-open'
    }, cfg || {});

    var dockReady = false;
    var drawerReady = false;
    var resizeObserver = null;

    function el(id) {
      return id ? document.getElementById(id) : null;
    }

    function syncHeaderOffset() {
      var header = document.getElementById('global-header');
      var h = header ? header.offsetHeight : 72;
      document.documentElement.style.setProperty('--tuto-header-offset', h + 'px');
    }

    function getHeaderOffset() {
      var v = getComputedStyle(document.documentElement).getPropertyValue('--tuto-header-offset');
      var n = parseFloat(v);
      return isNaN(n) ? 72 : n;
    }

    function isHeroInView() {
      var hero = document.querySelector(cfg.heroSelector);
      if (!hero) return false;
      return hero.getBoundingClientRect().bottom > getHeaderOffset() + 2;
    }

    function clearFixedStyles(sidebar) {
      if (!sidebar) return;
      sidebar.style.position = '';
      sidebar.style.top = '';
      sidebar.style.left = '';
      sidebar.style.width = '';
      sidebar.style.zIndex = '';
      sidebar.style.maxHeight = '';
      sidebar.style.overflowY = '';
      sidebar.style.transform = '';
    }

    function undock() {
      var sidebar = el(cfg.sidebarId);
      var spacer = el(cfg.spacerId);
      var col = el(cfg.colId);
      if (!sidebar) return;
      sidebar.classList.remove('is-docked');
      clearFixedStyles(sidebar);
      if (col) col.classList.remove('has-docked-spacer');
      if (spacer) {
        spacer.style.display = 'none';
        spacer.style.height = '0';
      }
    }

    function measureHeight(sidebar) {
      if (!sidebar) return 1;
      if (sidebar.classList.contains('is-docked')) {
        return Math.max(sidebar.offsetHeight, sidebar.scrollHeight, 1);
      }
      clearFixedStyles(sidebar);
      sidebar.classList.remove('is-docked');
      return Math.max(sidebar.offsetHeight, sidebar.scrollHeight, 1);
    }

    function applyDock(sidebar, col, spacer, naturalHeight) {
      var top = getHeaderOffset();
      var left = Math.max(0, Math.round(col.getBoundingClientRect().left));
      document.documentElement.style.setProperty('--tuto-sidebar-left', left + 'px');
      sidebar.classList.add('is-docked');
      sidebar.style.position = 'fixed';
      sidebar.style.top = top + 'px';
      sidebar.style.left = left + 'px';
      var sidebarW = getComputedStyle(document.documentElement).getPropertyValue('--course-sidebar-width').trim() || '22rem';
      sidebar.style.width = sidebarW;
      sidebar.style.zIndex = '20';
      sidebar.style.maxHeight = 'calc(100dvh - ' + top + 'px)';
      sidebar.style.overflowY = 'auto';
      sidebar.style.transform = 'none';
      col.classList.add('has-docked-spacer');
      if (spacer) {
        spacer.style.display = 'block';
        spacer.style.height = naturalHeight + 'px';
      }
    }

    function dock() {
      var sidebar = el(cfg.sidebarId);
      var spacer = el(cfg.spacerId);
      var col = el(cfg.colId);
      if (!sidebar || !col) return;
      applyDock(sidebar, col, spacer, measureHeight(sidebar));
    }

    function syncDock() {
      var sidebar = el(cfg.sidebarId);
      if (!sidebar) return;
      syncHeaderOffset();
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        undock();
        return;
      }
      if (isHeroInView()) {
        undock();
        return;
      }
      if (sidebar.classList.contains('is-docked')) {
        var col = el(cfg.colId);
        var spacer = el(cfg.spacerId);
        var top = getHeaderOffset();
        var left = Math.max(0, Math.round(col.getBoundingClientRect().left));
        document.documentElement.style.setProperty('--tuto-sidebar-left', left + 'px');
        sidebar.style.top = top + 'px';
        sidebar.style.left = left + 'px';
        sidebar.style.maxHeight = 'calc(100dvh - ' + top + 'px)';
        if (spacer) {
          spacer.style.height = Math.max(sidebar.offsetHeight, sidebar.scrollHeight, 1) + 'px';
        }
        return;
      }
      dock();
    }

    function openDrawer() {
      var sidebar = el(cfg.sidebarId);
      var backdrop = el(cfg.backdropId);
      if (!sidebar) return;
      sidebar.classList.add('is-open');
      document.body.classList.add(cfg.navOpenClass);
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      var sidebar = el(cfg.sidebarId);
      var backdrop = el(cfg.backdropId);
      if (!sidebar) return;
      sidebar.classList.remove('is-open');
      document.body.classList.remove(cfg.navOpenClass);
      if (backdrop) backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }

    function initResizeObserver() {
      var sidebar = el(cfg.sidebarId);
      if (!sidebar || resizeObserver || !('ResizeObserver' in window)) return;
      resizeObserver = new ResizeObserver(syncDock);
      resizeObserver.observe(sidebar);
    }

    function initDrawer() {
      if (drawerReady) return;
      drawerReady = true;
      var openBtn = el(cfg.openBtnId);
      var backdrop = el(cfg.backdropId);
      var sidebar = el(cfg.sidebarId);
      if (openBtn) openBtn.addEventListener('click', openDrawer);
      if (backdrop) backdrop.addEventListener('click', closeDrawer);
      if (sidebar && cfg.closeBtnId) {
        var closeBtn = sidebar.querySelector('#' + cfg.closeBtnId);
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
      }
      window.addEventListener('resize', function () {
        syncHeaderOffset();
        syncDock();
        if (window.matchMedia('(min-width: 1024px)').matches) closeDrawer();
      });
    }

    function init() {
      if (!dockReady) {
        dockReady = true;
        window.addEventListener('scroll', syncDock, { passive: true });
        window.addEventListener('resize', syncDock, { passive: true });
      }
      initResizeObserver();
      initDrawer();
      syncDock();
    }

    /** 側欄 HTML 載入後再同步一次（可重複呼叫） */
    function refresh() {
      syncDock();
    }

    return {
      init: init,
      refresh: refresh,
      sync: syncDock,
      syncHeaderOffset: syncHeaderOffset,
      open: openDrawer,
      close: closeDrawer
    };
  }

  global.initCourseSidebarDock = initCourseSidebarDock;
})(typeof window !== 'undefined' ? window : this);

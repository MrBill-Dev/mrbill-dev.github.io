(function () {
  var cfg = window.MRBILL_ADMIN || {};
  var apiBase = (cfg.apiBase || "").replace(/\/+$/, "");
  var token = cfg.apiToken || "";
  var MIN_ADMIN_TOKEN_LEN = 8;

  var els = {
    gate: document.getElementById("admin-gate"),
    app: document.getElementById("admin-app"),
    tokenInput: document.getElementById("admin-token-input"),
    tokenBtn: document.getElementById("admin-token-save"),
    list: document.getElementById("admin-article-list"),
    listSearch: document.getElementById("admin-list-search"),
    listFilter: document.getElementById("admin-list-filter"),
    listCount: document.getElementById("admin-list-count"),
    form: document.getElementById("admin-article-form"),
    status: document.getElementById("admin-status"),
    gateStatus: document.getElementById("admin-gate-status"),
    newBtn: document.getElementById("admin-new-btn"),
    refreshBtn: document.getElementById("admin-refresh-btn"),
    previewBar: document.getElementById("admin-preview-bar"),
    linksPanel: document.getElementById("admin-article-links"),
    placementList: document.getElementById("admin-placement-list"),
    previewLink: document.getElementById("admin-preview-link"),
    homePreviewLink: document.getElementById("admin-home-preview-link"),
    listPreviewLink: document.getElementById("admin-list-preview-link"),
    publicLink: document.getElementById("admin-public-link"),
    statusFoot: document.getElementById("admin-status-foot"),
    toast: document.getElementById("admin-toast"),
    linkHint: document.getElementById("admin-link-hint"),
    deleteBtn: document.getElementById("admin-delete-btn"),
    deleteHint: document.getElementById("admin-delete-hint"),
    snippetSelect: document.getElementById("admin-snippet-select"),
    snippetInsert: document.getElementById("admin-snippet-insert"),
    snippetReset: document.getElementById("admin-snippet-reset"),
    logoutBtn: document.getElementById("admin-logout-btn"),
    homeStripShowNav: document.getElementById("homeStripShowNav"),
    homeStripIntervalSec: document.getElementById("homeStripIntervalSec"),
    homeStripTransitionMs: document.getElementById("homeStripTransitionMs"),
    homeStripSettingsSave: document.getElementById("home-strip-settings-save")
  };

  var statusToastTimer = null;

  function setStatus(msg, isError) {
    var text = msg || "";
    if (els.status) {
      els.status.textContent = text;
      els.status.className = "admin-status";
      if (text) {
        els.status.classList.add(isError ? "admin-status--err" : "admin-status--ok");
      }
    }
    if (els.statusFoot) {
      els.statusFoot.textContent = text;
      els.statusFoot.className = "admin-status-foot";
      if (text) {
        els.statusFoot.classList.add(isError ? "admin-status-foot--err" : "admin-status-foot--ok");
      }
    }
    if (els.toast && text) {
      els.toast.textContent = text;
      els.toast.className =
        "admin-toast is-visible " + (isError ? "admin-toast--err" : "admin-toast--ok");
      if (statusToastTimer) clearTimeout(statusToastTimer);
      statusToastTimer = setTimeout(function () {
        if (els.toast) els.toast.classList.remove("is-visible");
      }, isError ? 6000 : 4000);
    } else if (els.toast) {
      els.toast.classList.remove("is-visible");
    }
    if (els.statusFoot && text) {
      requestAnimationFrame(function () {
        els.statusFoot.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }
  }

  function setGateStatus(msg, isError) {
    if (!els.gateStatus) return;
    els.gateStatus.textContent = msg || "";
    els.gateStatus.className = isError
      ? "text-sm text-rose-600 mb-2 min-h-[1.25rem]"
      : "text-sm text-emerald-700 mb-2 min-h-[1.25rem]";
  }

  function isAsciiToken(val) {
    if (!val || val.length < MIN_ADMIN_TOKEN_LEN) return false;
    for (var i = 0; i < val.length; i++) {
      if (val.charCodeAt(i) > 255) return false;
    }
    return true;
  }

  function syncAdminSession() {
    var sess = window.MRBILL_ADMIN_SESSION;
    var current = getToken();
    if (sess && isAsciiToken(current)) sess.setToken(current);
  }

  function getToken() {
    var sess = window.MRBILL_ADMIN_SESSION;
    if (sess) {
      var stored = sess.getToken();
      if (stored) return stored;
    }
    if (isAsciiToken(token)) return token;
    return "";
  }

  function tokenValidationMessage(val) {
    if (!val) return "請輸入管理密碼";
    if (val.length < MIN_ADMIN_TOKEN_LEN) {
      return "密碼太短（目前 " + val.length + " 字元），至少需要 " + MIN_ADMIN_TOKEN_LEN + " 字元";
    }
    for (var i = 0; i < val.length; i++) {
      if (val.charCodeAt(i) > 255) {
        return "密碼不可含中文，請只用英文、數字、符號";
      }
    }
    return "";
  }

  function saveTokenInput() {
    var val = (els.tokenInput && els.tokenInput.value) || "";
    var invalidMsg = tokenValidationMessage(val);
    if (invalidMsg) {
      setGateStatus(invalidMsg, true);
      if (els.tokenInput) els.tokenInput.focus();
      return;
    }
    setGateStatus("驗證中…", false);
    if (els.tokenBtn) els.tokenBtn.disabled = true;
    token = val;
    if (window.MRBILL_ADMIN_SESSION) {
      window.MRBILL_ADMIN_SESSION.setToken(val);
    }
    api("/api/admin/articles")
      .then(function (data) {
        showApp();
        renderList(data.articles || []);
        setStatus("已登入 " + new Date().toLocaleTimeString());
        setGateStatus("", false);
      })
      .catch(function (err) {
        token = "";
        if (window.MRBILL_ADMIN_SESSION) {
          window.MRBILL_ADMIN_SESSION.clearToken();
        }
        setGateStatus(err.message || "登入失敗，請確認密碼是否與 ADMIN_TOKEN 相同", true);
      })
      .finally(function () {
        if (els.tokenBtn) els.tokenBtn.disabled = false;
      });
  }

  var HOME_STRIP_LS_KEY = "mrbill-home-strip-settings";

  function readHomeStripLocal() {
    try {
      var raw = localStorage.getItem(HOME_STRIP_LS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function writeHomeStripLocal(data) {
    try {
      var payload = normalizeHomeStripSettings(data);
      payload.savedAt = Date.now();
      localStorage.setItem(HOME_STRIP_LS_KEY, JSON.stringify(payload));
    } catch (e) {}
  }

  function normalizeHomeStripSettings(raw) {
    var cfg = window.HOME_STRIP_CONFIG || {};
    var interval = Number(raw && raw.stripIntervalSec);
    var transition = Number(raw && raw.stripTransitionMs);
    if (!isFinite(interval)) interval = cfg.intervalSec || 10;
    if (!isFinite(transition)) transition = cfg.transitionMs || 900;
    interval = Math.max(2, Math.min(60, Math.floor(interval)));
    transition = Math.max(400, Math.min(2000, Math.floor(transition)));
    return {
      stripShowNav: !!(raw && raw.stripShowNav),
      stripIntervalSec: interval,
      stripTransitionMs: transition
    };
  }

  function applyHomeStripSettingsToForm(data) {
    var cfg = window.HOME_STRIP_CONFIG || {};
    var normalized = data ? normalizeHomeStripSettings(data) : null;
    if (els.homeStripShowNav) {
      els.homeStripShowNav.checked = normalized
        ? normalized.stripShowNav
        : !!cfg.showNav;
    }
    if (els.homeStripIntervalSec) {
      els.homeStripIntervalSec.value = normalized
        ? normalized.stripIntervalSec
        : cfg.intervalSec || 10;
    }
    if (els.homeStripTransitionMs) {
      els.homeStripTransitionMs.value = normalized
        ? normalized.stripTransitionMs
        : cfg.transitionMs || 900;
    }
  }

  function loadHomeStripSettings() {
    var local = readHomeStripLocal();
    if (local) {
      applyHomeStripSettingsToForm(local);
      return Promise.resolve();
    }
    return api("/api/admin/settings/home-strip")
      .then(function (data) {
        var merged = normalizeHomeStripSettings(data);
        writeHomeStripLocal(merged);
        applyHomeStripSettingsToForm(merged);
      })
      .catch(function () {
        applyHomeStripSettingsToForm(null);
      });
  }

  function saveHomeStripSettings() {
    var payload = normalizeHomeStripSettings({
      stripShowNav: !!(els.homeStripShowNav && els.homeStripShowNav.checked),
      stripIntervalSec:
        els.homeStripIntervalSec && els.homeStripIntervalSec.value,
      stripTransitionMs:
        els.homeStripTransitionMs && els.homeStripTransitionMs.value
    });
    writeHomeStripLocal(payload);
    applyHomeStripSettingsToForm(payload);
    return api("/api/admin/settings/home-strip", {
      method: "PUT",
      body: payload
    })
      .then(function () {
        setStatus(
          "橫幅設定已儲存（間隔 " +
            payload.stripIntervalSec +
            " 秒・滑動 " +
            payload.stripTransitionMs +
            " ms）"
        );
      })
      .catch(function () {
        setStatus(
          "已存本機（間隔 " +
            payload.stripIntervalSec +
            " 秒・滑動 " +
            payload.stripTransitionMs +
            " ms）。預覽首頁可立即套用；全站讀者需 deploy Worker 或改 home-strip.config.js"
        );
      });
  }

  function showApp() {
    document.body.classList.add("admin-is-authed");
    if (els.gate) els.gate.classList.add("hidden");
    if (els.app) els.app.classList.remove("hidden");
    if (els.logoutBtn) els.logoutBtn.classList.add("admin-is-visible");
    if (els.previewBar) els.previewBar.classList.remove("hidden");
    updatePreviewBar("", false, "draft", "");
    loadHomeStripSettings();
  }

  function hideApp() {
    document.body.classList.remove("admin-is-authed");
    if (els.gate) els.gate.classList.remove("hidden");
    if (els.app) els.app.classList.add("hidden");
    if (els.logoutBtn) els.logoutBtn.classList.remove("admin-is-visible");
  }

  function logoutAdmin() {
    token = "";
    if (window.MRBILL_ADMIN_SESSION) {
      window.MRBILL_ADMIN_SESSION.clearToken();
    }
    hideApp();
    if (els.tokenInput) els.tokenInput.value = "";
    if (els.status) els.status.textContent = "";
    setGateStatus("已登出。可重新輸入密碼測試登入／預覽。", false);
  }

  function api(path, options) {
    options = options || {};
    var headers = Object.assign(
      {
        Accept: "application/json",
        Authorization: "Bearer " + getToken()
      },
      options.headers || {}
    );
    if (options.body) headers["Content-Type"] = "application/json";
    return fetch(apiBase + path, {
      method: options.method || "GET",
      headers: headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    }).then(function (res) {
      return res.json().then(function (json) {
        if (!res.ok || !json.success) {
          var err = new Error((json && json.message) || "Request failed");
          err.status = res.status;
          throw err;
        }
        return json.data;
      });
    });
  }

  function statusLabel(s) {
    return (
      { draft: "草稿", scheduled: "排程", published: "已上架", archived: "已下架" }[
        s
      ] || s
    );
  }

  function blogPostUrl(slug, preview) {
    var base = "blog/post.html?slug=" + encodeURIComponent(slug || "");
    return preview ? base + "&preview=1" : base;
  }

  function homePreviewUrl(highlightSlug) {
    var url = "index.html?homePreview=1";
    if (highlightSlug) url += "&slug=" + encodeURIComponent(highlightSlug);
    return url;
  }

  function isPubliclyVisibleStatus(status, publishedAt) {
    if (status === "published") return true;
    if (status === "scheduled" && publishedAt) {
      var t = new Date(String(publishedAt).replace(" ", "T"));
      return !isNaN(t.getTime()) && t.getTime() <= Date.now();
    }
    return false;
  }

  function setPreviewLinkEnabled(linkEl, enabled) {
    if (!linkEl) return;
    linkEl.setAttribute("aria-disabled", enabled ? "false" : "true");
    linkEl.classList.toggle("is-disabled", !enabled);
  }

  function updatePreviewBar(slug, isSaved, status, publishedAt) {
    if (els.previewLink) {
      els.previewLink.href = isSaved ? blogPostUrl(slug, true) : "#";
      els.previewLink.setAttribute("data-slug", isSaved ? slug : "");
      setPreviewLinkEnabled(els.previewLink, isSaved);
    }
    if (els.homePreviewLink) {
      els.homePreviewLink.href = isSaved ? homePreviewUrl(slug) : "#";
      els.homePreviewLink.setAttribute("data-slug", isSaved ? slug : "");
      setPreviewLinkEnabled(els.homePreviewLink, isSaved);
    }
    if (els.listPreviewLink) {
      els.listPreviewLink.href = "blog/index.html";
      setPreviewLinkEnabled(els.listPreviewLink, true);
    }
    if (els.linkHint) {
      els.linkHint.textContent = isSaved
        ? "公開網址：blog/post.html?slug=" +
          slug +
          (isPubliclyVisibleStatus(status, publishedAt)
            ? "（讀者可開）"
            : "（尚未對讀者開放，請先預覽）")
        : "請先儲存文章後，即可預覽文章與首頁效果。「預覽列表」隨時可開。";
    }
  }

  function updateArticleLinksFromForm() {
    var slug = (field("slug") && field("slug").value.trim()) || "";
    var isSaved = !!(slug && field("slug") && field("slug").readOnly);
    var status = field("status") ? field("status").value : "draft";
    var publishedAt = field("publishedAt") ? field("publishedAt").value : "";

    updatePreviewBar(slug, isSaved, status, publishedAt);

    if (!isSaved) {
      if (els.linksPanel) els.linksPanel.classList.add("hidden");
      if (els.placementList) els.placementList.innerHTML = "";
      updateDeleteButton();
      return;
    }
    var featured = field("featured") && field("featured").checked;
    var homeMarquee = field("homeMarquee") && field("homeMarquee").checked;
    var homeCarousel = field("homeCarousel") && field("homeCarousel").checked;

    var placements = [];
    if (status === "draft") {
      placements.push("草稿：讀者看不到，請用「預覽前台」查看");
    } else if (status === "scheduled") {
      placements.push(
        "排程：" +
          (publishedAt ? "預計 " + publishedAt.replace("T", " ") + " 後出現在列表" : "請設定排程時間")
      );
    } else if (status === "published") {
      placements.push("已上架：出現在 blog/index.html 文章列表");
    } else if (status === "archived") {
      placements.push("已下架：讀者看不到");
    }
    var listStyle = field("listStyle") ? field("listStyle").value : "auto";
    if (listStyle === "full") placements.push("列表版型：大圖卡片（精選區）");
    else if (listStyle === "compact") placements.push("列表版型：精簡列（下方橫列）");
    else placements.push("列表版型：自動（精選→大卡，其餘→精簡列）");
    if (field("pinned") && field("pinned").checked) placements.push("置頂：排序最前");
    if (featured) placements.push("列表精選：自動模式下優先大卡");
    if (field("badgePopular") && field("badgePopular").checked) {
      placements.push("熱門標籤：列表顯示橘色角標");
    }
    if (field("badgeTrending") && field("badgeTrending").checked) {
      placements.push("人氣標籤：列表顯示紫色角標");
    }
    if (homeMarquee) {
      placements.push(
        "首頁跑馬燈：與「生活常駐」親子筆記輪播（常駐永遠保留＋雨天偵測；本篇為精選推薦）"
      );
    }
    if (homeCarousel) {
      placements.push("首頁輪播：首頁 tab「精選文章輪播」區（用「預覽首頁」查看）");
    }

    if (els.placementList) {
      els.placementList.innerHTML = placements
        .map(function (line) {
          return "<li>" + escapeHtml(line) + "</li>";
        })
        .join("");
    }
    if (els.publicLink) {
      var showPublic = isPubliclyVisibleStatus(status, publishedAt);
      els.publicLink.href = blogPostUrl(slug, false);
      els.publicLink.textContent = "上架連結";
      if (showPublic) els.publicLink.classList.remove("hidden");
      else els.publicLink.classList.add("hidden");
    }
    if (els.linksPanel) els.linksPanel.classList.remove("hidden");
    updateDeleteButton();
  }

  function updateDeleteButton() {
    var slug = (field("slug") && field("slug").value.trim()) || "";
    var isSaved = slug && field("slug") && field("slug").readOnly;
    if (!els.deleteBtn) return;
    if (!isSaved) {
      els.deleteBtn.classList.add("hidden");
      if (els.deleteHint) els.deleteHint.classList.add("hidden");
      return;
    }
    var status = field("status") ? field("status").value : "draft";
    if (status === "draft") {
      els.deleteBtn.textContent = "刪除草稿";
    } else if (status === "archived") {
      els.deleteBtn.textContent = "永久刪除";
    } else {
      els.deleteBtn.textContent = "下架文章";
    }
    els.deleteBtn.classList.remove("hidden");
    if (els.deleteHint) els.deleteHint.classList.remove("hidden");
  }

  function openPreviewSlug(slug) {
    if (!slug) return;
    if (!isAsciiToken(getToken())) {
      setStatus("請先在後台登入，再按預覽", true);
      return;
    }
    syncAdminSession();
    window.open(blogPostUrl(slug, true), "_blank", "noopener");
  }

  function openPreviewFromAdmin(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var slug = (field("slug") && field("slug").value.trim()) || "";
    if (!slug || !field("slug").readOnly) {
      setStatus("請先儲存文章，再按「預覽文章」", true);
      return;
    }
    openPreviewSlug(slug);
  }

  function openHomePreviewFromAdmin(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var slug = (field("slug") && field("slug").value.trim()) || "";
    if (!slug || !field("slug").readOnly) {
      setStatus("請先儲存文章，再按「預覽首頁」", true);
      return;
    }
    if (!isAsciiToken(getToken())) {
      setStatus("請先在後台登入，再按預覽", true);
      return;
    }
    syncAdminSession();
    window.open(homePreviewUrl(slug), "_blank", "noopener");
  }

  function deleteArticle() {
    var slug = (field("slug") && field("slug").value.trim()) || "";
    if (!slug || !field("slug").readOnly) return;
    var status = field("status") ? field("status").value : "draft";
    var purge = status === "draft" || status === "archived";
    var msg = purge
      ? "永久刪除「" + slug + "」？此動作無法復原。"
      : "下架「" + slug + "」？讀者將看不到，資料仍保留在後台（之後可永久刪除）。";
    if (!window.confirm(msg)) return;

    var path =
      "/api/admin/articles/" + encodeURIComponent(slug) + (purge ? "?purge=1" : "");
    api(path, { method: "DELETE" })
      .then(function () {
        setStatus(purge ? "已永久刪除" : "已下架");
        clearFormForNew();
        loadList();
      })
      .catch(function (err) {
        setStatus(err.message, true);
      });
  }

  var cachedArticles = [];

  function updateListCount(shown, total) {
    if (!els.listCount) return;
    if (!total) {
      els.listCount.textContent = "尚無動態文章";
      return;
    }
    if (shown === total) {
      els.listCount.textContent = "共 " + total + " 篇";
      return;
    }
    els.listCount.textContent = "顯示 " + shown + " / 共 " + total + " 篇";
  }

  function applyListFilter() {
    var q = (els.listSearch && els.listSearch.value || "").trim().toLowerCase();
    var status = els.listFilter ? els.listFilter.value : "";
    var filtered = cachedArticles.filter(function (a) {
      if (status && a.status !== status) return false;
      if (!q) return true;
      var hay = (
        (a.title || "") +
        " " +
        (a.slug || "") +
        " " +
        (a.category || "") +
        " " +
        (a.label || "")
      ).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    renderList(filtered, cachedArticles.length);
  }

  function loadList() {
    setStatus("載入中…");
    api("/api/admin/articles")
      .then(function (data) {
        cachedArticles = data.articles || [];
        applyListFilter();
        setStatus("已更新 " + new Date().toLocaleTimeString());
      })
      .catch(function (err) {
        if (err.status === 401 || err.status === 429) {
          hideApp();
        }
        setStatus(err.message || "載入失敗", true);
      });
  }

  function adminListStyleHint(a) {
    var bits = [];
    if (a.pinned) bits.push("置頂");
    if (a.listStyle === "full") bits.push("大卡");
    else if (a.listStyle === "compact") bits.push("精簡列");
    else if (a.featured) bits.push("精選");
    if (a.badgePopular) bits.push("熱門");
    if (a.badgeTrending) bits.push("人氣");
    return bits.length ? " · " + bits.join("、") : "";
  }

  function renderList(articles, totalCount) {
    if (!els.list) return;
    updateListCount(articles.length, typeof totalCount === "number" ? totalCount : articles.length);
    if (!articles.length) {
      var emptyMsg = cachedArticles.length
        ? "沒有符合篩選條件的文章，請調整搜尋或狀態。"
        : "尚無動態文章。靜態 4 篇不在此列表。";
      els.list.innerHTML = '<p class="admin-list-empty">' + emptyMsg + "</p>";
      return;
    }
    var activeSlug = (field("slug") && field("slug").value) || "";
    els.list.innerHTML = articles
      .map(function (a) {
        var active =
          activeSlug && a.slug === activeSlug && field("slug").readOnly
            ? " is-active"
            : "";
        return (
          '<button type="button" class="admin-list-item' +
          active +
          '" data-slug="' +
          escapeHtml(a.slug) +
          '">' +
          '<span class="admin-list-item__title">' +
          escapeHtml(a.title || a.slug) +
          "</span>" +
          '<span class="admin-list-item__meta">' +
          statusLabel(a.status) +
          " · " +
          escapeHtml(a.date || "") +
          adminListStyleHint(a) +
          "</span></button>"
        );
      })
      .join("");
    els.list.querySelectorAll(".admin-list-item[data-slug]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        loadArticle(btn.getAttribute("data-slug"));
      });
    });
  }

  function loadArticle(slug) {
    api("/api/admin/articles/" + slug).then(function (data) {
      fillForm(data.article);
    }).catch(function (err) {
      setStatus(err.message, true);
    });
  }

  function field(id) {
    return document.getElementById(id);
  }

  function fillForm(a) {
    if (!els.form || !a) return;
    field("slug").value = a.slug || "";
    field("slug").readOnly = true;
    field("title").value = a.title || "";
    field("subtitle").value = a.subtitle || "";
    field("excerpt").value = a.excerpt || "";
    field("label").value = a.label || "";
    field("category").value = a.category || "";
    field("audience").value = a.audience || "";
    field("date").value = a.date || "";
    field("readMins").value = a.readMins || 5;
    field("cover").value = a.cover || "";
    field("status").value = a.status || "draft";
    field("publishedAt").value = (a.publishedAt || "").replace(" ", "T");
    field("listStyle").value = a.listStyle || "auto";
    field("sortOrder").value = a.sortOrder != null ? a.sortOrder : 0;
    field("pinned").checked = !!a.pinned;
    field("featured").checked = !!a.featured;
    field("badgePopular").checked = !!a.badgePopular;
    field("badgeTrending").checked = !!a.badgeTrending;
    field("homeMarquee").checked = !!a.homeMarquee;
    field("homeCarousel").checked = !!a.homeCarousel;
    field("contentHtml").value = a.contentHtml || "";
    updateArticleLinksFromForm();
    highlightActiveListItem(a.slug);
  }

  function highlightActiveListItem(slug) {
    if (!els.list) return;
    var activeBtn = null;
    els.list.querySelectorAll(".admin-list-item[data-slug]").forEach(function (btn) {
      var isActive = btn.getAttribute("data-slug") === slug;
      btn.classList.toggle("is-active", isActive);
      if (isActive) activeBtn = btn;
    });
    if (activeBtn) {
      activeBtn.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  function getBlogSnippets() {
    return window.MRBILL_BLOG_SNIPPETS || {};
  }

  function getBlogSnippetLabels() {
    return window.MRBILL_BLOG_SNIPPET_LABELS || {};
  }

  function getStarterContentHtml() {
    var snippets = getBlogSnippets();
    return snippets.starter || "";
  }

  function insertAtTextarea(textarea, text) {
    if (!textarea || !text) return;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var before = textarea.value.slice(0, start);
    var after = textarea.value.slice(end);
    var glue = before && !before.endsWith("\n") ? "\n\n" : "";
    textarea.value = before + glue + text + (after ? "\n\n" + after : "");
    textarea.focus();
  }

  function initSnippetToolbar() {
    if (!els.snippetSelect) return;
    var snippets = getBlogSnippets();
    var labels = getBlogSnippetLabels();
    var keys = Object.keys(snippets).filter(function (k) {
      return k !== "starter";
    });
    els.snippetSelect.innerHTML = keys
      .map(function (key) {
        return (
          '<option value="' +
          escapeHtml(key) +
          '">' +
          escapeHtml(labels[key] || key) +
          "</option>"
        );
      })
      .join("");
  }

  function insertSelectedSnippet() {
    var key = els.snippetSelect ? els.snippetSelect.value : "";
    var snippet = getBlogSnippets()[key];
    if (!snippet || !field("contentHtml")) return;
    insertAtTextarea(field("contentHtml"), snippet);
    setStatus("已插入「" + (getBlogSnippetLabels()[key] || key) + "」區塊");
  }

  function resetStarterTemplate() {
    if (!field("contentHtml")) return;
    if (
      field("contentHtml").value.trim() &&
      !window.confirm("將以開場版型覆蓋目前正文，確定嗎？")
    ) {
      return;
    }
    field("contentHtml").value = getStarterContentHtml();
    setStatus("已套用開場版型");
  }

  function clearFormForNew() {
    if (!els.form) return;
    els.form.reset();
    field("slug").readOnly = false;
    field("status").value = "draft";
    field("readMins").value = 5;
    if (field("contentHtml")) field("contentHtml").value = getStarterContentHtml();
    if (field("date") && !field("date").value) {
      field("date").value = new Date().toISOString().slice(0, 10);
    }
    if (els.linksPanel) els.linksPanel.classList.add("hidden");
    if (els.deleteBtn) els.deleteBtn.classList.add("hidden");
    if (els.deleteHint) els.deleteHint.classList.add("hidden");
    updatePreviewBar("", false, "draft", "");
    highlightActiveListItem("");
  }

  function collectForm() {
    return {
      slug: field("slug").value.trim(),
      title: field("title").value.trim(),
      subtitle: field("subtitle").value.trim(),
      excerpt: field("excerpt").value.trim(),
      label: field("label").value.trim(),
      category: field("category").value.trim(),
      audience: field("audience").value.trim(),
      date: field("date").value.trim(),
      readMins: Number(field("readMins").value) || 5,
      cover: field("cover").value.trim(),
      status: field("status").value,
      publishedAt: field("publishedAt").value
        ? field("publishedAt").value.replace("T", " ") + ":00"
        : null,
      listStyle: field("listStyle").value,
      sortOrder: Number(field("sortOrder").value) || 0,
      pinned: field("pinned").checked,
      featured: field("featured").checked,
      badgePopular: field("badgePopular").checked,
      badgeTrending: field("badgeTrending").checked,
      homeMarquee: field("homeMarquee").checked,
      homeCarousel: field("homeCarousel").checked,
      contentHtml: field("contentHtml").value
    };
  }

  function saveForm(ev) {
    ev.preventDefault();
    var data = collectForm();
    var isNew = !field("slug").readOnly;
    var path = isNew
      ? "/api/admin/articles"
      : "/api/admin/articles/" + encodeURIComponent(data.slug);
    var method = isNew ? "POST" : "PUT";
    api(path, { method: method, body: data })
      .then(function () {
        setStatus(isNew ? "已建立" : "已儲存");
        field("slug").readOnly = true;
        updateArticleLinksFromForm();
        loadList();
      })
      .catch(function (err) {
        setStatus(err.message, true);
      });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function boot() {
    if (!apiBase) {
      setGateStatus("請設定 js/admin/admin.config.local.js 的 apiBase", true);
      return;
    }
    if (els.tokenBtn) els.tokenBtn.addEventListener("click", saveTokenInput);
    if (els.tokenInput) {
      els.tokenInput.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") {
          ev.preventDefault();
          saveTokenInput();
        }
      });
    }
    if (els.newBtn) els.newBtn.addEventListener("click", clearFormForNew);
    if (els.refreshBtn) els.refreshBtn.addEventListener("click", loadList);
    if (els.listSearch) {
      els.listSearch.addEventListener("input", applyListFilter);
    }
    if (els.listFilter) {
      els.listFilter.addEventListener("change", applyListFilter);
    }
    if (els.form) {
      els.form.addEventListener("submit", saveForm);
      els.form.addEventListener("change", function () {
        updateArticleLinksFromForm();
        updateDeleteButton();
      });
    }
    if (els.deleteBtn) els.deleteBtn.addEventListener("click", deleteArticle);
    if (els.logoutBtn) els.logoutBtn.addEventListener("click", logoutAdmin);
    if (els.previewLink) {
      els.previewLink.addEventListener("click", openPreviewFromAdmin);
    }
    if (els.homePreviewLink) {
      els.homePreviewLink.addEventListener("click", openHomePreviewFromAdmin);
    }
    if (els.listPreviewLink) {
      els.listPreviewLink.addEventListener("click", function () {
        syncAdminSession();
      });
    }
    if (els.homeStripSettingsSave) {
      els.homeStripSettingsSave.addEventListener("click", saveHomeStripSettings);
    }
    initSnippetToolbar();
    if (els.snippetInsert) {
      els.snippetInsert.addEventListener("click", insertSelectedSnippet);
    }
    if (els.snippetReset) {
      els.snippetReset.addEventListener("click", resetStarterTemplate);
    }

    if (isAsciiToken(getToken())) {
      syncAdminSession();
      showApp();
      loadList();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

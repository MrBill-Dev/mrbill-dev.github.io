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
    notice: document.getElementById("admin-notice"),
    editorShell: document.getElementById("admin-editor-shell"),
    editorWorkspace: document.getElementById("admin-editor-workspace"),
    editorStage: document.getElementById("admin-editor-stage"),
    gateStatus: document.getElementById("admin-gate-status"),
    newBtn: document.getElementById("admin-new-btn"),
    refreshBtn: document.getElementById("admin-refresh-btn"),
    githubPanel: document.getElementById("admin-github-sync-panel"),
    utilsDrawer: document.getElementById("admin-utils-drawer"),
    githubTokenExpiresAt: document.getElementById("githubTokenExpiresAt"),
    githubTokenSave: document.getElementById("github-token-save"),
    githubTokenProbe: document.getElementById("github-token-probe"),
    editorTabBtns: document.querySelectorAll("[data-admin-tab]"),
    tabPanels: document.querySelectorAll("[data-admin-tab-panel]"),
    tabHeading: document.getElementById("admin-tab-heading"),
    linksPanel: document.getElementById("admin-article-links"),
    placementList: document.getElementById("admin-placement-list"),
    previewLink: document.getElementById("admin-preview-link"),
    homePreviewLink: document.getElementById("admin-home-preview-link"),
    listPreviewLink: document.getElementById("admin-list-preview-link"),
    publicLink: document.getElementById("admin-public-link"),
    toast: document.getElementById("admin-toast"),
    linkHint: document.getElementById("admin-link-hint"),
    deleteBtn: document.getElementById("admin-delete-btn"),
    deleteHint: document.getElementById("admin-delete-hint"),
    syncShareBtn: document.getElementById("admin-sync-share-btn"),
    subbar: document.getElementById("admin-subbar"),
    actionDock: document.getElementById("admin-action-dock"),
    snippetSelect: document.getElementById("admin-snippet-select"),
    snippetInsert: document.getElementById("admin-snippet-insert"),
    snippetReset: document.getElementById("admin-snippet-reset"),
    logoutBtn: document.getElementById("admin-logout-btn"),
    homeStripShowNav: document.getElementById("homeStripShowNav"),
    homeStripIntervalSec: document.getElementById("homeStripIntervalSec"),
    homeStripTransitionMs: document.getElementById("homeStripTransitionMs"),
    homeStripSettingsSave: document.getElementById("home-strip-settings-save"),
    importSeedsBtn: document.getElementById("admin-import-seeds-btn"),
    seedImportHint: document.getElementById("admin-seed-import-hint")
  };

  var blockEditor = null;
  var statusToastTimer = null;
  var ADMIN_TAB_LS_KEY = "mrbill-admin-editor-tab";
  var GITHUB_EXPIRY_LS_KEY = "mrbill-github-token-expires-at";
  var GITHUB_HELP_PAGE = "admin-github-help.html";
  var ADMIN_TAB_LABELS = {
    basic: "基本資訊",
    list: "列表曝光",
    body: "正文編輯"
  };
  var githubSyncState = {
    expiresAt: "",
    lastProbeAt: "",
    lastProbeOk: true,
    probeOk: null,
    probeMessage: ""
  };

  function setStatus(msg, isError, options) {
    options = options || {};
    var text = msg || "";
    if (els.notice) {
      els.notice.textContent = text;
      els.notice.className = "admin-notice";
      if (text) {
        els.notice.classList.add(isError ? "admin-notice--err" : "admin-notice--ok");
      }
    }
    if (els.toast) {
      els.toast.classList.remove("is-visible");
    }
    if (text && !options.silent && !options.sticky) {
      if (statusToastTimer) clearTimeout(statusToastTimer);
      statusToastTimer = setTimeout(function () {
        if (els.notice && els.notice.textContent === text) {
          setStatus("", false, { silent: true });
        }
      }, isError ? 8000 : 5000);
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
        cachedArticles = data.articles || [];
        showApp();
        applyListFilter();
        updateSeedImportUi(cachedArticles);
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
    if (els.subbar) els.subbar.classList.remove("hidden");
    if (els.actionDock) els.actionDock.classList.remove("hidden");
    if (els.logoutBtn) els.logoutBtn.classList.add("admin-is-visible");
    updatePreviewBar("", false, "draft", "");
    loadHomeStripSettings();
  }

  function hideApp() {
    document.body.classList.remove("admin-is-authed");
    if (els.gate) els.gate.classList.remove("hidden");
    if (els.app) els.app.classList.add("hidden");
    if (els.subbar) els.subbar.classList.add("hidden");
    if (els.actionDock) els.actionDock.classList.add("hidden");
    if (els.logoutBtn) els.logoutBtn.classList.remove("admin-is-visible");
  }

  function logoutAdmin() {
    token = "";
    if (window.MRBILL_ADMIN_SESSION) {
      window.MRBILL_ADMIN_SESSION.clearToken();
    }
    hideApp();
    if (els.tokenInput) els.tokenInput.value = "";
    if (els.notice) els.notice.textContent = "";
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

  function articleShareUrl(slug) {
    if (!slug) return "";
    return "https://mrbill-dev.github.io/blog/" + encodeURIComponent(slug) + "/";
  }

  function formatShareSyncNote(shareSync) {
    if (!shareSync) return { text: "", isError: false };
    if (shareSync.ok && shareSync.url) {
      return {
        text:
          "文章頁已同步 GitHub（約 1～2 分鐘生效，路徑 " +
          (shareSync.path || "blog/slug/") +
          "）",
        isError: false
      };
    }
    if (shareSync.ok && shareSync.removed) {
      return { text: "已從 GitHub 移除分享頁", isError: false };
    }
    if (shareSync.skipped) {
      if (shareSync.message && shareSync.message.indexOf("GITHUB_TOKEN") >= 0) {
        return {
          text: "分享頁未同步：請設定 GITHUB_TOKEN（見 ADMIN-SETUP.md）",
          isError: true
        };
      }
      return { text: "", isError: false };
    }
    return {
      text:
        "分享頁同步失敗：" +
        (shareSync.message || "未知錯誤") +
        (shareSync.message && /Bad credentials|401/i.test(shareSync.message)
          ? " — 請用「本機 test 成功的那個 token」再執行 wrangler secret put GITHUB_TOKEN"
          : ""),
      isError: true
    };
  }

  function daysUntilExpiry(dateStr) {
    if (!dateStr) return null;
    var d = new Date(dateStr + "T12:00:00");
    if (isNaN(d.getTime())) return null;
    return Math.ceil((d.getTime() - Date.now()) / 86400000);
  }

  function formatProbeTime(iso) {
    if (!iso) return "";
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return iso;
      return d.toLocaleString("zh-TW", { hour12: false });
    } catch (e) {
      return iso;
    }
  }

  function readGithubExpiryLocal() {
    try {
      return localStorage.getItem(GITHUB_EXPIRY_LS_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function writeGithubExpiryLocal(val) {
    try {
      if (val) localStorage.setItem(GITHUB_EXPIRY_LS_KEY, val);
      else localStorage.removeItem(GITHUB_EXPIRY_LS_KEY);
    } catch (e) {}
  }

  function mergeGithubSettings(data) {
    if (!data) return;
    if (data.expiresAt !== undefined) githubSyncState.expiresAt = data.expiresAt || "";
    if (!githubSyncState.expiresAt) {
      githubSyncState.expiresAt = readGithubExpiryLocal();
    }
    if (data.lastProbeAt !== undefined) {
      githubSyncState.lastProbeAt = data.lastProbeAt || "";
    }
    if (data.lastProbeOk !== undefined) githubSyncState.lastProbeOk = !!data.lastProbeOk;
    if (els.githubTokenExpiresAt) {
      els.githubTokenExpiresAt.value = githubSyncState.expiresAt;
    }
  }

  function openGithubSettings() {
    if (els.utilsDrawer) {
      els.utilsDrawer.open = true;
      els.utilsDrawer.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    if (els.githubTokenExpiresAt) {
      setTimeout(function () {
        els.githubTokenExpiresAt.focus();
      }, 80);
    }
  }

  function saveGithubExpiryRequest(val) {
    function tryMethod(method) {
      return api("/api/admin/settings/github-sync", {
        method: method,
        body: { expiresAt: val }
      });
    }
    return tryMethod("PUT").catch(function (err) {
      if (err && err.status === 405) {
        return tryMethod("POST");
      }
      throw err;
    });
  }

  function renderGithubSyncPanel() {
    if (!els.githubPanel) return;
    var state = githubSyncState;
    var days = daysUntilExpiry(state.expiresAt);
    var level = "ok";
    var badge = "GitHub 同步正常";
    var lines = [];

    if (state.probeOk === false) {
      level = "err";
      badge = "無法同步 GitHub";
      lines.push(state.probeMessage || "Token 測試失敗");
      if (/Bad credentials|401/i.test(state.probeMessage || "")) {
        lines.push("請重新申請 PAT 並執行 wrangler secret put GITHUB_TOKEN");
      }
    }

    if (!state.expiresAt) {
      if (level === "ok") {
        level = "warn";
        badge = "請記錄 Token 到期日";
      }
      lines.push("申請 PAT 時 GitHub 會顯示到期日 → 點「填寫到期日」記在後台。");
    } else if (days !== null && days < 0) {
      level = "err";
      badge = "Token 已過期";
      lines.push("到期日 " + state.expiresAt + "，請重新申請並更新 Worker secret。");
    } else if (days !== null && days <= 14) {
      if (level !== "err") level = "warn";
      badge = days <= 7 ? days + " 天內到期" : "約 " + days + " 天後到期";
      lines.push("到期日 " + state.expiresAt + "，建議提前更新 Token。");
    } else if (state.expiresAt) {
      lines.push("Token 到期日：" + state.expiresAt);
    }

    if (state.lastProbeAt) {
      lines.push(
        "上次連線測試：" +
          formatProbeTime(state.lastProbeAt) +
          (state.lastProbeOk ? "（成功）" : "（失敗）")
      );
    }

    els.githubPanel.className =
      "admin-github-panel admin-github-panel--compact admin-github-panel--" + level;
    els.githubPanel.innerHTML =
      '<p class="admin-github-panel__title">GitHub 文章頁同步 <span class="admin-github-panel__badge">' +
      escapeHtml(badge) +
      "</span></p>" +
      '<p class="admin-github-panel__text">' +
      lines.map(escapeHtml).join("<br>") +
      "</p>" +
      '<div class="admin-github-panel__actions">' +
      '<button type="button" data-github-open-settings>填寫到期日</button>' +
      '<button type="button" data-github-probe>測試連線</button>' +
      '<a href="' +
      escapeHtml(GITHUB_HELP_PAGE) +
      '" target="_blank" rel="noopener noreferrer">Token 申請步驟</a>' +
      "</div>";
    els.githubPanel.classList.remove("hidden");

    if (level !== "ok" && els.utilsDrawer) {
      els.utilsDrawer.open = true;
    }

    var openBtn = els.githubPanel.querySelector("[data-github-open-settings]");
    if (openBtn) {
      openBtn.addEventListener("click", openGithubSettings);
    }
    var probeBtn = els.githubPanel.querySelector("[data-github-probe]");
    if (probeBtn) {
      probeBtn.addEventListener("click", function () {
        probeGithubSync();
      });
    }
  }

  function loadGithubSyncSettings() {
    mergeGithubSettings({ expiresAt: readGithubExpiryLocal() });
    return api("/api/admin/settings/github-sync")
      .then(function (data) {
        mergeGithubSettings(data);
        if (data && data.expiresAt) writeGithubExpiryLocal(data.expiresAt);
        renderGithubSyncPanel();
      })
      .catch(function () {
        renderGithubSyncPanel();
      });
  }

  function saveGithubTokenExpiry() {
    var val = els.githubTokenExpiresAt ? els.githubTokenExpiresAt.value : "";
    if (els.githubTokenSave) els.githubTokenSave.disabled = true;
    return saveGithubExpiryRequest(val)
      .then(function (data) {
        mergeGithubSettings(data);
        writeGithubExpiryLocal(val);
        renderGithubSyncPanel();
        setStatus(val ? "已儲存 Token 到期日：" + val : "已清除到期日紀錄");
      })
      .catch(function (err) {
        var msg = err && err.message ? err.message : "無法儲存到期日";
        if (/Method not allowed|405/i.test(msg)) {
          writeGithubExpiryLocal(val);
          mergeGithubSettings({ expiresAt: val });
          renderGithubSyncPanel();
          setStatus(
            "已暫存本機瀏覽器。請 wrangler deploy 並執行 migrate-github-token-meta.sql 後再儲存一次以同步雲端。",
            true
          );
          return;
        }
        setStatus(msg, true);
      })
      .finally(function () {
        if (els.githubTokenSave) els.githubTokenSave.disabled = false;
      });
  }

  function probeGithubSync() {
    if (els.githubTokenProbe) els.githubTokenProbe.disabled = true;
    return fetch(apiBase + "/api/admin/articles/github-sync-probe", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getToken()
      }
    })
      .then(function (res) {
        return res.json().then(function (json) {
          var data = (json && json.data) || {};
          var probe = data.probe || {};
          mergeGithubSettings(data.githubSettings);
          githubSyncState.probeOk = !!probe.ok;
          githubSyncState.probeMessage = probe.message || (json && json.message) || "";
          if (data.githubSettings && data.githubSettings.lastProbeAt) {
            githubSyncState.lastProbeAt = data.githubSettings.lastProbeAt;
            githubSyncState.lastProbeOk = !!data.githubSettings.lastProbeOk;
          }
          renderGithubSyncPanel();
          if (probe.ok) {
            setStatus(probe.message || "GitHub Token 正常", false, { silent: true });
          } else {
            var detail = githubSyncState.probeMessage;
            if (probe.tokenLength) {
              detail += "（Worker token 長度 " + probe.tokenLength + "）";
            }
            setStatus(detail, true);
          }
        });
      })
      .catch(function (err) {
        githubSyncState.probeOk = false;
        githubSyncState.probeMessage = err.message || "GitHub 測試失敗";
        renderGithubSyncPanel();
        setStatus(githubSyncState.probeMessage, true);
      })
      .finally(function () {
        if (els.githubTokenProbe) els.githubTokenProbe.disabled = false;
      });
  }

  function switchEditorTab(tabId) {
    if (!tabId) return;
    if (els.editorTabBtns) {
      els.editorTabBtns.forEach(function (btn) {
        var active = btn.getAttribute("data-admin-tab") === tabId;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
    }
    if (els.editorShell) {
      els.editorShell.setAttribute("data-admin-active-tab", tabId);
    }
    if (els.tabHeading && ADMIN_TAB_LABELS[tabId]) {
      els.tabHeading.textContent = ADMIN_TAB_LABELS[tabId];
    }
    if (els.tabPanels) {
      els.tabPanels.forEach(function (panel) {
        panel.classList.toggle(
          "is-active",
          panel.getAttribute("data-admin-tab-panel") === tabId
        );
      });
    }
    try {
      localStorage.setItem(ADMIN_TAB_LS_KEY, tabId);
    } catch (e) {}
    if (els.editorStage) {
      els.editorStage.scrollTop = 0;
    }
    var mainPanel = document.querySelector(".admin-main");
    if (mainPanel) {
      mainPanel.scrollTop = 0;
    }
    if (tabId === "body" && blockEditor && blockEditor.refreshPreview) {
      requestAnimationFrame(function () {
        blockEditor.refreshPreview();
      });
    }
  }

  function initEditorTabs() {
    var saved = "basic";
    try {
      saved = localStorage.getItem(ADMIN_TAB_LS_KEY) || "basic";
    } catch (e) {}
    if (saved !== "basic" && saved !== "list" && saved !== "body") saved = "basic";
    switchEditorTab(saved);
    if (els.editorTabBtns) {
      els.editorTabBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          switchEditorTab(btn.getAttribute("data-admin-tab"));
        });
      });
    }
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
      if (!isSaved) {
        els.linkHint.textContent =
          "請先儲存文章後，即可預覽文章與首頁效果。「預覽列表」隨時可開。";
      } else if (isPubliclyVisibleStatus(status, publishedAt)) {
        els.linkHint.innerHTML =
          "正式網址（訪客複製、Facebook 用）：<code>blog/" +
          escapeHtml(slug) +
          "/</code>（儲存已上架文時自動同步 GitHub）";
      } else {
        els.linkHint.textContent =
          "公開網址：blog/post.html?slug=" +
          slug +
          "（尚未對讀者開放，請先預覽）";
      }
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
      if (els.syncShareBtn) els.syncShareBtn.classList.add("hidden");
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
      placements.push(
        "已上架：blog/" + slug + "/（自動含 OG，訪客複製網址列即可分享）"
      );
      if (publishedAt) {
        var pubAt = new Date(String(publishedAt).replace(" ", "T"));
        if (!isNaN(pubAt.getTime()) && pubAt.getTime() > Date.now()) {
          placements.push(
            "⚠ 排程時間仍在未來（" +
              publishedAt.replace("T", " ") +
              "）。若讀者看不到，請清空「排程發布時間」再儲存。"
          );
        }
      }
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
    var titleFont = field("titleFont") ? field("titleFont").value : "sans";
    placements.push(
      titleFont === "serif" ? "標題字體：明體（生活筆記）" : "標題字體：黑體（預設）"
    );

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
    if (els.syncShareBtn) {
      var showShare =
        isSaved && isPubliclyVisibleStatus(status, publishedAt);
      els.syncShareBtn.classList.toggle("hidden", !showShare);
      els.syncShareBtn.disabled = !showShare;
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
    return api("/api/admin/articles")
      .then(function (data) {
        cachedArticles = data.articles || [];
        applyListFilter();
        updateSeedImportUi(cachedArticles);
        setStatus("已更新 " + new Date().toLocaleTimeString());
      })
      .catch(function (err) {
        if (err.status === 401 || err.status === 429) {
          hideApp();
        }
        setStatus(err.message || "載入失敗", true);
        throw err;
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
    if (a.titleFont === "serif") bits.push("明體");
    return bits.length ? " · " + bits.join("、") : "";
  }

  function renderList(articles, totalCount) {
    if (!els.list) return;
    updateListCount(articles.length, typeof totalCount === "number" ? totalCount : articles.length);
    if (!articles.length) {
      var emptyMsg = cachedArticles.length
        ? "沒有符合篩選條件的文章，請調整搜尋或狀態。"
        : "尚無動態文章。靜態 4 篇不在此列表。";
      var pendingSeeds = getPendingSeedDrafts().filter(function (d) {
        return d && d.slug;
      });
      if (!cachedArticles.length && pendingSeeds.length && els.importSeedsBtn) {
        emptyMsg +=
          " 上方可點「匯入種子草稿」寫入已準備好的 " +
          pendingSeeds.length +
          " 篇。";
      }
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
    if (field("titleFont")) field("titleFont").value = a.titleFont === "serif" ? "serif" : "sans";
    field("sortOrder").value = a.sortOrder != null ? a.sortOrder : 0;
    field("pinned").checked = !!a.pinned;
    field("featured").checked = !!a.featured;
    field("badgePopular").checked = !!a.badgePopular;
    field("badgeTrending").checked = !!a.badgeTrending;
    field("homeMarquee").checked = !!a.homeMarquee;
    field("homeCarousel").checked = !!a.homeCarousel;
    field("contentHtml").value = a.contentHtml || "";
    if (blockEditor) blockEditor.loadFromHtml(a.contentHtml || "");
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
    if (blockEditor && blockEditor.getMode() === "blocks") {
      var appended = blockEditor.appendFromHtml(snippet);
      if (appended.ok) {
        setStatus("已插入「" + (getBlogSnippetLabels()[key] || key) + "」區塊");
        return;
      }
      if (appended.message) setStatus(appended.message, true);
      return;
    }
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
    if (blockEditor && blockEditor.getMode() === "blocks") {
      blockEditor.resetToDefault();
    } else {
      field("contentHtml").value = getStarterContentHtml();
      if (blockEditor) blockEditor.loadFromHtml(field("contentHtml").value);
    }
    setStatus("已套用開場版型");
  }

  function clearFormForNew() {
    if (!els.form) return;
    els.form.reset();
    field("slug").readOnly = false;
    field("status").value = "draft";
    field("readMins").value = 5;
    if (blockEditor) blockEditor.resetToDefault();
    else if (field("contentHtml")) field("contentHtml").value = getStarterContentHtml();
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
    if (blockEditor) blockEditor.syncToTextarea();
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
      titleFont: field("titleFont") ? field("titleFont").value : "sans",
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

  function syncSharePage() {
    var slug = (field("slug") && field("slug").value.trim()) || "";
    if (!slug || !field("slug").readOnly) {
      setStatus("請先儲存文章", true);
      return;
    }
    if (!isPubliclyVisibleStatus(field("status").value, field("publishedAt").value)) {
      setStatus("僅已上架文章可同步分享頁", true);
      return;
    }
    if (els.syncShareBtn) els.syncShareBtn.disabled = true;
    setStatus("同步分享頁中…");
    api("/api/admin/articles/" + encodeURIComponent(slug) + "/sync-share", {
      method: "POST",
      body: {}
    })
      .then(function (data) {
        var note = formatShareSyncNote(data && data.shareSync);
        setStatus(note.text || "分享頁已同步", note.isError);
        updateArticleLinksFromForm();
      })
      .catch(function (err) {
        setStatus(err.message || "分享頁同步失敗", true);
      })
      .finally(function () {
        if (els.syncShareBtn) els.syncShareBtn.disabled = false;
      });
  }

  function saveForm(ev) {
    ev.preventDefault();
    var data = collectForm();
    var isNew = !field("slug").readOnly;
    var sentTitleFont = data.titleFont === "serif" ? "serif" : "sans";
    if (data.status === "published" && data.publishedAt) {
      var pubAt = new Date(String(data.publishedAt).replace(" ", "T"));
      if (!isNaN(pubAt.getTime()) && pubAt.getTime() > Date.now()) {
        data.publishedAt = null;
      }
    }
    var path = isNew
      ? "/api/admin/articles"
      : "/api/admin/articles/" + encodeURIComponent(data.slug);
    var method = isNew ? "POST" : "PUT";
    api(path, { method: method, body: data })
      .then(function (saveData) {
        field("slug").readOnly = true;
        return api("/api/admin/articles/" + encodeURIComponent(data.slug)).then(
          function (resp) {
            return { saved: resp, shareSync: saveData && saveData.shareSync };
          }
        );
      })
      .then(function (bundle) {
        var saved = (bundle.saved && bundle.saved.article) || {};
        var shareSync = bundle.shareSync;
        fillForm(saved);
        updateArticleLinksFromForm();
        loadList();
        var savedTitleFont = saved.titleFont === "serif" ? "serif" : "sans";
        if (sentTitleFont !== savedTitleFont) {
          setStatus(
            "已儲存其他欄位，但標題字體未寫入資料庫。請在 backend/mrbill-worker 執行 migrate-articles-v4.sql 後 wrangler deploy。",
            true
          );
          return;
        }
        var statusMsg = isNew ? "已建立" : "已儲存";
        if (data.status === "published" || data.status === "scheduled") {
          statusMsg +=
            "。SEO 與 sitemap 已自動生效（動態文無需 npm run seo:sync）";
        }
        var shareNote = formatShareSyncNote(shareSync);
        if (shareNote.text) statusMsg += "；" + shareNote.text;
        setStatus(statusMsg, shareNote.isError);
      })
      .catch(function (err) {
        var msg = err.message || "儲存失敗";
        if (/title_font|no such column/i.test(msg)) {
          msg +=
            "。請執行 migrate-articles-v4.sql 後 wrangler deploy。";
        }
        setStatus(msg, true);
      });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getPendingSeedDrafts() {
    var list = window.MRBILL_SEED_DRAFTS;
    return Array.isArray(list) ? list : [];
  }

  function updateSeedImportUi(articles) {
    var drafts = getPendingSeedDrafts();
    if (!drafts.length) return;
    var existing = {};
    (articles || []).forEach(function (row) {
      if (row && row.slug) existing[row.slug] = true;
    });
    var pending = drafts.filter(function (d) {
      return d && d.slug && !existing[d.slug];
    });
    if (els.importSeedsBtn) {
      els.importSeedsBtn.classList.toggle("hidden", pending.length === 0);
      els.importSeedsBtn.textContent =
        pending.length > 1
          ? "匯入種子草稿（" + pending.length + "）"
          : "匯入種子草稿";
    }
    if (els.seedImportHint) {
      if (pending.length === 0) {
        els.seedImportHint.classList.add("hidden");
        els.seedImportHint.textContent = "";
      } else {
        els.seedImportHint.classList.remove("hidden");
        els.seedImportHint.textContent =
          "有 " +
          pending.length +
          " 篇已轉好版型、尚未寫入後端。點「匯入種子草稿」後左側列表會出現，再用預覽檢查。";
      }
    }
  }

  function importPendingSeedDrafts() {
    var drafts = getPendingSeedDrafts();
    if (!drafts.length) {
      setStatus("沒有可匯入的種子草稿", true);
      return;
    }
    if (!isAsciiToken(getToken())) {
      setStatus("請先登入後台", true);
      return;
    }
    if (els.importSeedsBtn) els.importSeedsBtn.disabled = true;
    setStatus("匯入中…");
    api("/api/admin/articles")
      .then(function (data) {
        var existing = {};
        (data.articles || []).forEach(function (row) {
          if (row && row.slug) existing[row.slug] = true;
        });
        var pending = drafts.filter(function (d) {
          return d && d.slug && !existing[d.slug];
        });
        if (!pending.length) {
          updateSeedImportUi(data.articles || []);
          setStatus("種子草稿皆已在後端，無需重複匯入");
          return null;
        }
        var chain = Promise.resolve();
        var imported = [];
        pending.forEach(function (payload) {
          chain = chain.then(function () {
            var body = Object.assign({ status: "draft" }, payload);
            return api("/api/admin/articles", { method: "POST", body: body }).then(
              function () {
                imported.push(payload.slug);
              }
            );
          });
        });
        return chain.then(function () {
          return { imported: imported };
        });
      })
      .then(function (result) {
        if (!result) return;
        return loadList().then(function () {
          if (result.imported.length === 1) {
            return loadArticle(result.imported[0]);
          }
        });
      })
      .then(function () {
        setStatus("已匯入種子草稿，請用預覽檢查版型");
      })
      .catch(function (err) {
        setStatus(err.message || "匯入失敗", true);
      })
      .finally(function () {
        if (els.importSeedsBtn) els.importSeedsBtn.disabled = false;
      });
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
    if (els.importSeedsBtn) {
      els.importSeedsBtn.addEventListener("click", importPendingSeedDrafts);
    }
    if (els.listSearch) {
      els.listSearch.addEventListener("input", applyListFilter);
    }
    if (els.listFilter) {
      els.listFilter.addEventListener("change", applyListFilter);
    }
    if (els.form) {
      els.form.addEventListener("submit", saveForm);
      els.form.addEventListener("change", function (ev) {
        updateArticleLinksFromForm();
        updateDeleteButton();
        if (
          blockEditor &&
          ev.target &&
          (ev.target.id === "titleFont" || ev.target.name === "titleFont")
        ) {
          blockEditor.refreshPreview();
        }
      });
    }
    if (els.deleteBtn) els.deleteBtn.addEventListener("click", deleteArticle);
    if (els.syncShareBtn) els.syncShareBtn.addEventListener("click", syncSharePage);
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
    if (els.githubTokenSave) {
      els.githubTokenSave.addEventListener("click", saveGithubTokenExpiry);
    }
    if (els.githubTokenProbe) {
      els.githubTokenProbe.addEventListener("click", probeGithubSync);
    }
    initEditorTabs();
    initSnippetToolbar();
    if (els.snippetInsert) {
      els.snippetInsert.addEventListener("click", insertSelectedSnippet);
    }
    if (els.snippetReset) {
      els.snippetReset.addEventListener("click", resetStarterTemplate);
    }

    if (window.MRBILL_BLOG_BLOCK_EDITOR) {
      blockEditor = window.MRBILL_BLOG_BLOCK_EDITOR.init({
        textarea: field("contentHtml"),
        blockListEl: document.getElementById("admin-block-list"),
        previewIframe: document.getElementById("admin-content-preview"),
        blockPanel: document.getElementById("admin-block-editor-panel"),
        htmlPanel: document.getElementById("admin-html-editor-panel"),
        modeBlocksBtn: document.getElementById("admin-editor-mode-blocks"),
        modeHtmlBtn: document.getElementById("admin-editor-mode-html"),
        addBlockSelect: document.getElementById("admin-block-add-select"),
        getTitleFont: function () {
          var f = field("titleFont");
          return f && f.value === "serif" ? "serif" : "sans";
        }
      });
    }

    if (isAsciiToken(getToken())) {
      syncAdminSession();
      showApp();
      loadList();
      loadGithubSyncSettings().then(function () {
        return probeGithubSync();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

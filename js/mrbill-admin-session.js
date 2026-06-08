/**
 * 後台登入狀態（localStorage，同源多分頁共用；僅存本機，不進 Git）
 */
(function () {
  var STORAGE_KEY = "mrbill-admin-token";
  var MIN_LEN = 8;

  function isAsciiToken(val) {
    if (!val || val.length < MIN_LEN) return false;
    for (var i = 0; i < val.length; i++) {
      if (val.charCodeAt(i) > 255) return false;
    }
    return true;
  }

  function readStoredToken() {
    var sources = [];
    try {
      sources.push(localStorage.getItem(STORAGE_KEY) || "");
    } catch (e) {}
    try {
      sources.push(sessionStorage.getItem(STORAGE_KEY) || "");
    } catch (e) {}
    for (var i = 0; i < sources.length; i++) {
      if (isAsciiToken(sources[i])) return sources[i];
    }
    return "";
  }

  function getToken() {
    return readStoredToken();
  }

  function setToken(val) {
    if (!isAsciiToken(val)) return false;
    try {
      localStorage.setItem(STORAGE_KEY, val);
      sessionStorage.setItem(STORAGE_KEY, val);
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearToken() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  function hasSession() {
    return !!getToken();
  }

  window.MRBILL_ADMIN_SESSION = {
    STORAGE_KEY: STORAGE_KEY,
    MIN_LEN: MIN_LEN,
    isAsciiToken: isAsciiToken,
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken,
    hasSession: hasSession
  };
})();

(function () {
  function clampIndex(idx, total) {
    if (!Number.isInteger(idx)) return 0;
    if (idx < 0) return 0;
    if (idx >= total) return total - 1;
    return idx;
  }

  function loadState(storageKey, total) {
    try {
      var raw = localStorage.getItem(storageKey);
      if (!raw) return { current: 0, completed: new Array(total).fill(false) };
      var parsed = JSON.parse(raw);
      var completed = new Array(total).fill(false);
      if (Array.isArray(parsed.completed)) {
        parsed.completed.slice(0, total).forEach(function (v, i) {
          completed[i] = Boolean(v);
        });
      }
      return {
        current: clampIndex(parsed.current, total),
        completed: completed
      };
    } catch (e) {
      return { current: 0, completed: new Array(total).fill(false) };
    }
  }

  function saveState(storageKey, state) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function create(options) {
    var storageKey = options.storageKey;
    var total = options.total;
    var onSelect = options.onSelect;
    var onStatsChange = options.onStatsChange;
    var state = loadState(storageKey, total);

    function stats() {
      var completedCount = state.completed.filter(Boolean).length;
      return {
        total: total,
        completed: completedCount,
        percent: total ? Math.round((completedCount / total) * 100) : 0,
        current: state.current
      };
    }

    function emitStats() {
      if (typeof onStatsChange === "function") onStatsChange(stats());
    }

    function select(index) {
      state.current = clampIndex(index, total);
      saveState(storageKey, state);
      if (typeof onSelect === "function") onSelect(state.current);
      emitStats();
    }

    function setCompleted(index, checked) {
      var i = clampIndex(index, total);
      state.completed[i] = Boolean(checked);
      saveState(storageKey, state);
      emitStats();
    }

    function toggleCompleted(index) {
      var i = clampIndex(index, total);
      state.completed[i] = !state.completed[i];
      saveState(storageKey, state);
      emitStats();
      return state.completed[i];
    }

    function isCompleted(index) {
      var i = clampIndex(index, total);
      return Boolean(state.completed[i]);
    }

    function reset() {
      state = { current: 0, completed: new Array(total).fill(false) };
      saveState(storageKey, state);
      if (typeof onSelect === "function") onSelect(0);
      emitStats();
    }

    function bindResetButton(buttonEl, confirmText) {
      if (!buttonEl) return;
      buttonEl.addEventListener("click", function () {
        var ok = window.confirm(confirmText || "確定要重置目前課程進度嗎？");
        if (ok) reset();
      });
    }

    function init() {
      if (typeof onSelect === "function") onSelect(state.current);
      emitStats();
    }

    return {
      init: init,
      select: select,
      setCompleted: setCompleted,
      toggleCompleted: toggleCompleted,
      isCompleted: isCompleted,
      reset: reset,
      bindResetButton: bindResetButton,
      getCurrent: function () { return state.current; },
      getStats: stats
    };
  }

  window.CourseProgress = { create: create };
})();


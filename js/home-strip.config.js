/**

 * 首頁橫幅預設（全站讀者看到的後備值）

 * - 後台「儲存橫幅設定」+ Worker 部署後，以 D1 為準

 * - 未 deploy Worker 時，可改這裡讓 GitHub 上的正式站也套用

 */

(function () {

  window.HOME_STRIP_CONFIG = {

    showNav: false,

    intervalSec: 2,

    transitionMs: 1000

  };

})();



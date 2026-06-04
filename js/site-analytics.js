(function () {
  var cfg = window.SITE_ANALYTICS || {};
  var ga4 = (cfg.ga4 || "").trim();
  if (!ga4) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", ga4, { anonymize_ip: true });
})();

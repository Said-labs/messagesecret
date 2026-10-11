  (function () {
  var KEY = 'theme';
  var saved = localStorage.getItem(KEY);
  if (!saved) saved = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    var popup = document.getElementById('menuPopup');
    if (!popup) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-popup__item';
    function paint() {
      btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap';
    }
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
      paint();
      window.dispatchEvent(new Event('themechange'));
    });
    paint();
    popup.insertBefore(btn, popup.querySelector('.menu-popup__footer'));
  });
})();

/* ═══════════════════════════════════════════════════════
   PATCH für main.js — highlightEE Funktion
   
   ERSETZE die bestehende Funktion:
   
   function highlightEE(n) {
     document.querySelectorAll('.ee-flow-svg circle.pointer').forEach(function(node) {
       node.classList.remove('active');
     });
     var node = document.getElementById('ee-svg-' + n);
     if (node) node.classList.add('active');
     ...
   }
   
   MIT dieser neuen Version:
   ═══════════════════════════════════════════════════════ */

function highlightEE(n) {
  // HTML-Stationen (neu) und Step-Dots deaktivieren
  document.querySelectorAll('.ee-station, .ee-step-dot').forEach(function(node) {
    node.classList.remove('active');
  });

  // Richtige Station + Dot aktivieren
  var station = document.querySelector('.ee-station[data-id="' + n + '"]');
  if (station) station.classList.add('active');

  var dots = document.querySelectorAll('.ee-step-dot');
  if (dots[n - 1]) dots[n - 1].classList.add('active');

  // Detail-Box aktualisieren (identisch wie vorher)
  var detail = document.getElementById('ee-detail');
  var d = eeData[n];
  if (d && detail) {
    detail.classList.add('active');
    detail.innerHTML =
      '<div class="ee-detail-title">' + escHtml(d.title) + '</div>' +
      '<div class="ee-detail-text">' + escHtml(d.text) + '</div>' +
      '<div class="ee-detail-tip">💡 ' + d.tip + '</div>';
  }
}

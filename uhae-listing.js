/**
 * uhae-listing.js
 * Scripts for the product listing / shop page (uhae-template.html).
 * Depends on: Bootstrap 5 bundle (loaded before this script)
 */

'use strict';

/* ── Language switcher ────────────────────────────────────────── */
function setLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // TODO: implement real i18n — swap text content based on `lang` value
}

/* ── Price range filter label ─────────────────────────────────── */
// Called inline via oninput on the range input; kept here for clarity.
// The HTML calls: oninput="updatePriceLabel(this)"
function updatePriceLabel(input) {
  const label = document.getElementById('priceVal');
  if (label) label.textContent = input.value + ' лв.';
}

/* ── Add-to-cart button feedback ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check2"></i>';
      btn.style.background = 'var(--accent)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.style.color = '';
      }, 1200);
    });
  });
});

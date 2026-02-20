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

/* ── Sidebar toggle for mobile ────────────────────────────────── */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('show');
  overlay.classList.toggle('show');
  
  // Prevent body scroll when sidebar is open
  if (sidebar.classList.contains('show')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

/* ── Add-to-cart button feedback ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Add to cart button animation
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

  // Filter toggle icon rotation for mobile
  const filterToggles = document.querySelectorAll('.filter-toggle[data-bs-toggle="collapse"]');
  filterToggles.forEach(toggle => {
    const target = document.querySelector(toggle.getAttribute('data-bs-target'));
    if (target) {
      target.addEventListener('show.bs.collapse', () => {
        toggle.setAttribute('aria-expanded', 'true');
      });
      target.addEventListener('hide.bs.collapse', () => {
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  });
});

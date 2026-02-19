/**
 * uhae-product.js
 * Scripts for the product detail page (uhae-product.html).
 * Depends on: Bootstrap 5 bundle (loaded before this script)
 */

'use strict';

/* ── Language switcher ────────────────────────────────────────── */
function setLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // TODO: implement real i18n — swap text content based on `lang` value
}

/* ── Gallery — thumbnail switcher ────────────────────────────── */
const mainImg = document.getElementById('mainImg');

function switchImg(thumb, src) {
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = '1';
  }, 180);
}

/* ── Lightbox ─────────────────────────────────────────────────── */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

mainImg.addEventListener('click', () => {
  lightboxImg.src = mainImg.src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ── Quantity control ─────────────────────────────────────────── */
function changeQty(delta) {
  const input = document.getElementById('qtyInput');
  const val = Math.max(1, parseInt(input.value || 1) + delta);
  input.value = val;
}

/* ── "Искам го" button feedback ──────────────────────────────── */
function addToCart(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="bi bi-check2 me-1"></i> Добавено!';
  btn.style.background = 'var(--accent)';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
  }, 1500);
  // TODO: hook into real cart / e-commerce API here
}

/* ── Wishlist toggle ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const wishlistBtn = document.querySelector('.btn-wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function () {
      const icon = this.querySelector('i');
      icon.classList.toggle('bi-heart');
      icon.classList.toggle('bi-heart-fill');
      const isActive = icon.classList.contains('bi-heart-fill');
      this.style.borderColor = isActive ? 'var(--accent)' : '';
      this.style.color       = isActive ? 'var(--accent)' : '';
      // TODO: persist wishlist state (localStorage / API)
    });
  }
});

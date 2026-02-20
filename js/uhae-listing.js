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

/* ── Filter state management ──────────────────────────────────── */
let initialFilterState = {};

function saveInitialFilterState() {
  const priceRange = document.getElementById('priceRange');
  const scentSelect = document.getElementById('scentSelect');
  
  if (priceRange && scentSelect) {
    initialFilterState = {
      price: priceRange.value,
      scent: scentSelect.value
    };
  }
}

function getCurrentFilterState() {
  const priceRange = document.getElementById('priceRange');
  const scentSelect = document.getElementById('scentSelect');
  
  if (priceRange && scentSelect) {
    return {
      price: priceRange.value,
      scent: scentSelect.value
    };
  }
  return {};
}

function checkFilterChanges() {
  const current = getCurrentFilterState();
  const applyBtn = document.getElementById('applyFiltersBtn');
  
  if (!applyBtn) return;
  
  // Compare current state with initial state
  const hasChanges = current.price !== initialFilterState.price || 
                     current.scent !== initialFilterState.scent;
  
  if (hasChanges) {
    applyBtn.classList.remove('d-none');
  } else {
    applyBtn.classList.add('d-none');
  }
}

function toggleFilters() {
  const filtersSection = document.getElementById('filtersSection');
  const filtersToggle = document.getElementById('filtersToggle');
  
  if (filtersSection.classList.contains('show')) {
    filtersSection.classList.remove('show');
  } else {
    filtersSection.classList.add('show');
  }
}

function applyFilters() {
  const applyBtn = document.getElementById('applyFiltersBtn');
  
  // Update initial state to current state
  saveInitialFilterState();
  
  // Hide apply button
  if (applyBtn) {
    applyBtn.classList.add('d-none');
  }
  
  // TODO: Apply filters - call API/update product listing
  console.log('Applying filters:', getCurrentFilterState());
  
  // On mobile, close filters section after applying
  if (window.innerWidth < 992) {
    const filtersSection = document.getElementById('filtersSection');
    if (filtersSection) {
      filtersSection.classList.remove('show');
    }
  }
}

/* ── Add-to-cart button feedback ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Save initial filter state
  saveInitialFilterState();
  
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
});

/* ============================================================
   script.js — NOVA FC
============================================================ */

/* ── NAV: scroll class + mobile menu ───────────────────────── */
const nav        = document.getElementById('topNav');
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

burger.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.hidden = expanded;
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ── REVEAL ON SCROLL ────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.style.getPropertyValue('--d') || '0s';
      entry.target.style.transitionDelay = delay;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── FOOTER YEAR ─────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── CATEGORY CTA: highlight Contact card in Location ───────── */
function highlightContactCard() {
  const card = document.getElementById('locContact');
  if (!card) return;

  card.classList.remove('is-highlight');
  // Force reflow to restart animation if needed
  void card.offsetWidth;
  card.classList.add('is-highlight');

  // Focus for keyboard/screen reader users
  card.focus({ preventScroll: true });

  window.setTimeout(() => {
    card.classList.remove('is-highlight');
  }, 1800);
}

(() => {
  const key = 'nova_fc_focus_contact';

  document.querySelectorAll('a[data-highlight="contact"]').forEach((a) => {
    a.addEventListener('click', () => {
      try { sessionStorage.setItem(key, '1'); } catch {}
      // Wait for the smooth scroll to bring the section into view
      window.setTimeout(highlightContactCard, 450);
    });
  });

  // If the user arrives to #location after clicking "Inscribirse" (e.g., after refresh),
  // highlight once for clarity.
  try {
    if (window.location.hash === '#location' && sessionStorage.getItem(key) === '1') {
      sessionStorage.removeItem(key);
      window.setTimeout(highlightContactCard, 650);
    }
  } catch {}
})();


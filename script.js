/* =========================================================
   Kancelaria Klimas — interactions
   ========================================================= */

(() => {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinks = nav.querySelector('.nav__links');
  const links = nav.querySelectorAll('.nav__links a');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const toTop = document.getElementById('toTop');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky / scrolled state + back to top ---- */
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 12);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile burger menu ---- */
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* Close mobile menu after link click */
  links.forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---- Scrollspy ---- */
  if ('IntersectionObserver' in window) {
    const linkById = new Map();
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) linkById.set(href.slice(1), a);
    });

    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const id = e.target.id;
        const link = linkById.get(id);
        if (!link) return;
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0,
    });

    sections.forEach(s => spy.observe(s));
  }

  /* ---- Reveal-on-scroll animations ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          revealer.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    revealEls.forEach(el => revealer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Cross-fade sliders (hero + about) ---- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startSlider = (containerId, slideSelector, intervalMs) => {
    const c = document.getElementById(containerId);
    if (!c) return;
    const slides = c.querySelectorAll(slideSelector);
    if (slides.length < 2 || reduceMotion) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, intervalMs);
  };
  startSlider('heroSlider', '.hero__slide', 6000);
  startSlider('aboutSlider', '.about__img', 5500);

  /* ---- Cookie banner ---- */
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    const STORAGE_KEY = 'klimas-cookie-consent';
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }

    if (!stored) {
      cookieBanner.hidden = false;
      // wait one frame so display:none -> block can transition
      requestAnimationFrame(() => {
        setTimeout(() => cookieBanner.classList.add('is-visible'), 600);
      });
    }

    const dismiss = (value) => {
      try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
      cookieBanner.classList.remove('is-visible');
      setTimeout(() => { cookieBanner.hidden = true; }, 400);
    };

    document.getElementById('cookieAccept')?.addEventListener('click', () => dismiss('accepted'));
    document.getElementById('cookieReject')?.addEventListener('click', () => dismiss('essential'));
  }

  /* ---- Close mobile nav on Escape ---- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();

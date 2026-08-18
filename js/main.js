/* Almendra — interacciones del sitio */
(function () {
  'use strict';

  /* Header sólido al scrollear */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    header.classList.toggle('is-solid', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menú móvil */
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('is-open'));
    mobileMenu.querySelector('.close-menu').addEventListener('click', () =>
      mobileMenu.classList.remove('is-open')
    );
    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
    );
  }

  /* Carrito */
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  const openCart = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const closeCart = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-open-cart]').forEach((el) =>
    el.addEventListener('click', openCart)
  );
  document.querySelectorAll('[data-close-cart]').forEach((el) =>
    el.addEventListener('click', closeCart)
  );
  if (overlay) overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  /* Agregar al carrito (visual) */
  const toast = document.querySelector('.toast');
  let toastTimer;
  const showToast = (name) => {
    if (!toast) return;
    toast.innerHTML = '<em>' + name + '</em>&nbsp; se sumó a tu carrito';
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };
  document.querySelectorAll('[data-add]').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showToast(btn.dataset.add);
      setTimeout(openCart, 500);
    })
  );

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* Filtros de tienda */
  const chips = document.querySelectorAll('.chip[data-filter]');
  const cards = document.querySelectorAll('.product-card[data-cat]');
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const f = chip.dataset.filter;
      cards.forEach((card) => {
        card.classList.toggle('is-hidden', f !== 'todo' && card.dataset.cat !== f);
      });
    })
  );

  /* Galería de producto */
  const mainImg = document.querySelector('.pdp-main img');
  document.querySelectorAll('.pdp-thumbs button').forEach((thumb) =>
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.pdp-thumbs button').forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = thumb.querySelector('img').src;
        mainImg.style.opacity = '1';
      }, 250);
    })
  );

  /* Talles */
  document.querySelectorAll('.size').forEach((s) =>
    s.addEventListener('click', () => {
      document.querySelectorAll('.size').forEach((x) => x.classList.remove('is-active'));
      s.classList.add('is-active');
    })
  );

  /* Cantidad */
  const qtyOut = document.querySelector('.qty output');
  if (qtyOut) {
    let qty = 1;
    document.querySelector('.qty [data-minus]').addEventListener('click', () => {
      qty = Math.max(1, qty - 1);
      qtyOut.textContent = qty;
    });
    document.querySelector('.qty [data-plus]').addEventListener('click', () => {
      qty = Math.min(9, qty + 1);
      qtyOut.textContent = qty;
    });
  }

  /* Formularios demo */
  document.querySelectorAll('form[data-demo]').forEach((form) =>
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Gracias');
    })
  );
})();

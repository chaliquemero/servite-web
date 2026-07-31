/* ===== SERVITE — Landing interactions ===== */
(function () {
  'use strict';

  var nav = document.getElementById('navbar');
  var navLinks = document.getElementById('navLinks');
  var hamburger = document.getElementById('hamburger');
  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');
  var yearEl = document.getElementById('year');

  /* Año dinámico */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Nav: sombra al hacer scroll */
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* Menú móvil */
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Cerrar menú al navegar a una sección */
  if (navLinks) {
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Scrollspy: resaltar link de la sección visible */
  var sections = document.querySelectorAll('section[id], header[id]');
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if ('IntersectionObserver' in window && navAnchors.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* Fotos: si el archivo existe, reemplaza el placeholder */
  document.querySelectorAll('.photo img').forEach(function (img) {
    var probe = new Image();
    probe.onload = function () {
      var wrap = img.parentElement;
      wrap.classList.add('has-photo');
      img.style.display = 'block';
    };
    probe.onerror = function () { img.remove(); };
    probe.src = img.getAttribute('src');
  });

  /* Slider de la app (solo dentro de #app) */
  var appEl = document.getElementById('app');
  var screens = [];
  var msteps = [];
  var phoneWrap = null;
  var idx = 0;
  var timer = null;

  if (appEl) {
    screens = Array.prototype.slice.call(appEl.querySelectorAll('.screen'));
    msteps = Array.prototype.slice.call(appEl.querySelectorAll('.mstep'));
    phoneWrap = appEl.querySelector('.phone-wrap');
  }

  function go(i) {
    if (!screens.length || !msteps.length) return;
    idx = (i + screens.length) % screens.length;
    screens.forEach(function (s, k) { s.classList.toggle('active', k === idx); });
    msteps.forEach(function (s, k) { s.classList.toggle('active', k === idx); });
  }

  function start() {
    stop();
    timer = setInterval(function () { go(idx + 1); }, 4000);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  msteps.forEach(function (s, k) {
    s.addEventListener('click', function () { go(k); start(); });
  });

  if (phoneWrap) {
    phoneWrap.addEventListener('mouseenter', stop);
    phoneWrap.addEventListener('mouseleave', start);
    phoneWrap.addEventListener('touchstart', stop, { passive: true });
    phoneWrap.addEventListener('touchend', start);
  }

  if (screens.length) start();

  /* Animación de la canilla del hero */
  var mlEl = document.getElementById('tapMl');
  var priceEl = document.getElementById('tapPrice');
  var statusEl = document.getElementById('tapStatus');
  var streamEl = document.getElementById('tapStream');
  var liquidEl = document.getElementById('tapLiquid');

  if (mlEl && priceEl && statusEl && streamEl && liquidEl) {
    var ML_MAX = 400;
    var PRICE_PER_ML = 6.25;
    var ml = 0;
    var serving = false;
    var last = null;

    function render() {
      mlEl.textContent = String(Math.round(ml)).padStart(3, '0');
      priceEl.textContent = '$' + Math.round(ml * PRICE_PER_ML);
      streamEl.style.height = (serving && ml < ML_MAX ? 54 : 0) + 'px';
      liquidEl.style.height = Math.min(88, (ml / ML_MAX) * 88) + '%';
    }

    function startTap() {
      serving = true;
      statusEl.textContent = 'Sirviendo...';
      statusEl.classList.add('serving');
    }

    function finishTap() {
      serving = false;
      statusEl.textContent = 'Listo - $2.500';
      statusEl.classList.remove('serving');
      window.setTimeout(function () {
        ml = 0;
        last = null;
        render();
        statusEl.textContent = 'Lista';
        window.setTimeout(startTap, 900);
      }, 2400);
    }

    function frame(t) {
      if (serving) {
        if (last === null) last = t;
        var dt = t - last;
        last = t;
        ml = Math.min(ML_MAX, ml + (dt / 1000) * (ML_MAX / 4.2));
        render();
        if (ml >= ML_MAX) finishTap();
      }
      requestAnimationFrame(frame);
    }

    window.setTimeout(startTap, 700);
    requestAnimationFrame(frame);
  }

  /* Video de la galería: play/pause con el botón central */
  var videoEl = document.getElementById('nocheVideo');
  var videoPlay = document.getElementById('videoPlay');
  if (videoEl && videoPlay) {
    videoPlay.addEventListener('click', function () {
      var p = videoEl.play();
      if (p && p.catch) p.catch(function () {});
    });
    videoEl.addEventListener('play', function () { videoPlay.classList.add('hidden'); });
    videoEl.addEventListener('pause', function () { videoPlay.classList.remove('hidden'); });
    videoEl.addEventListener('ended', function () { videoPlay.classList.remove('hidden'); });
  }

  /* Generador del patrón QR (medida fija) */
  var qrEl = document.getElementById('qrPattern');
  if (qrEl) {
    var n = 17;
    var frag = document.createDocumentFragment();
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        var cell = document.createElement('span');
        var inCorner = (r < 5 && c < 5) || (r < 5 && c >= n - 5) || (r >= n - 5 && c < 5);
        var on = inCorner ? true : ((r * 31 + c * 17 + r * c) % 7) < 3;
        if (on) cell.className = 'on';
        frag.appendChild(cell);
      }
    }
    qrEl.appendChild(frag);
  }

  /* FAQ accordion */
  var faqQs = document.querySelectorAll('.faq-q');
  faqQs.forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentNode;
      var wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !wasOpen);
      q.setAttribute('aria-expanded', wasOpen ? 'false' : 'true');
    });
  });

  /* Envío del formulario: arma un email con los datos (sin backend) */
  var EMAIL_TO = 'hola@servite.com.ar';

  function setStatus(msg, ok) {
    if (!formStatus) return;
    formStatus.className = 'form-status ' + (ok ? 'ok' : 'err');
    formStatus.textContent = msg;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nombre = (data.get('nombre') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var empresa = (data.get('empresa') || '').toString().trim();
      var tipo = (data.get('tipo') || '').toString().trim();
      var mensaje = (data.get('mensaje') || '').toString().trim();

      if (!email) { setStatus('Ingresá un email válido.', false); return; }

      var asunto = encodeURIComponent('Consulta SERVITE — ' + (empresa || nombre || 'Nueva consulta'));
      var cuerpo = [
        'Nueva consulta desde servite-landing:',
        '',
        'Nombre: ' + nombre,
        'Email: ' + email,
        'Empresa / evento: ' + (empresa || '-'),
        'Tipo: ' + (tipo || '-'),
        '',
        'Mensaje:',
        mensaje
      ].join('\n');

      window.location.href = 'mailto:' + EMAIL_TO + '?subject=' + asunto + '&body=' + encodeURIComponent(cuerpo);

      setStatus(nombre
        ? 'Gracias ' + nombre.split(' ')[0] + ', se abrió tu correo con la consulta lista para enviar.'
        : 'Se abrió tu correo con la consulta lista para enviar.', true);
      form.reset();
    });
  }
})();

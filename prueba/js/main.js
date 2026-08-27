// ============================================
// MargaExpress — Interactividad general
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // Año dinámico en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Menú móvil
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });

    // Cierra el menú al hacer clic en un enlace
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    });
  }

  // ============================================
  // Carrusel automático de fotos
  // ============================================
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track) {
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let autoPlayTimer = null;
    const AUTOPLAY_DELAY = 4000;

    // Crear puntos indicadores
    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
      dot.addEventListener('click', function () {
        goToSlide(i);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateCarousel() {
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function resetAutoPlay() {
      startAutoPlay();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Pausar en hover para mejor experiencia
    const carouselEl = document.getElementById('carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', function () {
        clearInterval(autoPlayTimer);
      });
      carouselEl.addEventListener('mouseleave', function () {
        startAutoPlay();
      });
    }

    updateCarousel();
    startAutoPlay();
  }

  // ============================================
  // Detección de bloqueo del iframe de rastreo (vaenvio.com)
  // ============================================
  const trackingIframe = document.getElementById('trackingIframe');
  const trackingCard = document.getElementById('trackingCard');

  if (trackingIframe && trackingCard) {
    let resolved = false;

    function showFallbackCard() {
      if (resolved) return;
      resolved = true;
      trackingCard.classList.add('show');
    }

    // Si el sitio externo bloquea ser embebido (X-Frame-Options/CSP),
    // el navegador carga un documento vacío que SÍ es accesible (mismo origen),
    // mientras que un embebido exitoso (cross-origin real) lanza un error al intentar leerlo.
    trackingIframe.addEventListener('load', function () {
      try {
        const doc = trackingIframe.contentDocument || trackingIframe.contentWindow.document;
        const bodyLength = doc && doc.body ? doc.body.innerHTML.trim().length : 0;
        if (!doc || bodyLength === 0) {
          showFallbackCard();
        } else {
          resolved = true; // se pudo leer contenido propio: asumimos carga correcta
        }
      } catch (e) {
        // Error de origen cruzado = el iframe cargó contenido externo real
        resolved = true;
      }
    });

    trackingIframe.addEventListener('error', showFallbackCard);

    // Tiempo límite de seguridad por si no se dispara ningún evento
    setTimeout(showFallbackCard, 3500);
  }

  // ============================================
  // Botón flotante "Subir arriba"
  // ============================================
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    const SCROLL_THRESHOLD = 400;

    function toggleBackToTop() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

// Single consolidated script for nav, smooth scroll, header, carousel and lightbox
(function () {
  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  navToggle &&
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      navToggle.setAttribute("aria-expanded", expanded);
    });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (nav && nav.classList.contains("open")) nav.classList.remove("open");
        navToggle && navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Header shrink on scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");

  const galleryImgs = Array.from(
    document.querySelectorAll(".card-image, .gallery-item img")
  );
  const images = galleryImgs.map((i) => i.getAttribute("src"));
  let currentIndex = 0;

  function openLightbox(idx) {
    if (!lightbox || !lbImage) return;
    currentIndex = (idx + images.length) % images.length;
    lbImage.src = images[currentIndex];
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("open");
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.classList.remove("open");
    lbImage && lbImage.classList.remove("zoomed");
  }
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lbImage.src = images[currentIndex];
  }
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lbImage.src = images[currentIndex];
  }

  // delegated click to open
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!t) return;
    if (
      t.matches(".card-image, .card-image *") ||
      t.matches(".gallery-item img")
    ) {
      const img = t.closest(".card")
        ? t.closest(".card").querySelector(".card-image")
        : t.tagName === "IMG"
        ? t
        : null;
      if (img) {
        const src = img.getAttribute("src");
        const idx = images.indexOf(src);
        if (idx >= 0) openLightbox(idx);
      }
    }
  });
  lbClose && lbClose.addEventListener("click", closeLightbox);
  lbNext && lbNext.addEventListener("click", nextImage);
  lbPrev && lbPrev.addEventListener("click", prevImage);
  lightbox &&
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.getAttribute("aria-hidden") === "true") return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
  lbImage &&
    lbImage.addEventListener("click", () => lbImage.classList.toggle("zoomed"));

  // footer year
  const yearEl = document.getElementById("year");
  yearEl && (yearEl.textContent = new Date().getFullYear());

  // Carousel infinite with clones and autoplay
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const galleryCarousel = document.getElementById("galleryCarousel");
  let slideIndex = 0,
    originalCount = 0,
    cardWidth = 0;
  const GAP = 14;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w > 1400) return 7;
    if (w > 1100) return 6;
    if (w > 900) return 5;
    if (w > 700) return 4;
    if (w > 500) return 3;
    return 2;
  }
  function updateCardMetrics() {
    if (!track || !track.children.length) return;
    const first = track.children[0];
    cardWidth = first.getBoundingClientRect().width + GAP;
  }
  function updateCarousel(transition = true) {
    if (!track) return;
    updateCardMetrics();
    track.style.transition = transition ? "transform 350ms ease" : "none";
    track.style.transform = `translateX(${-slideIndex * cardWidth}px)`;
  }

  track &&
    track.addEventListener("transitionend", () => {
      if (!track || originalCount <= 0) return;
      if (slideIndex >= originalCount) {
        slideIndex = slideIndex - originalCount;
        updateCarousel(false);
      } else if (slideIndex < 0) {
        slideIndex = slideIndex + originalCount;
        updateCarousel(false);
      }
    });

  prevBtn &&
    prevBtn.addEventListener("click", () => {
      slideIndex = slideIndex - 1;
      updateCarousel();
    });
  nextBtn &&
    nextBtn.addEventListener("click", () => {
      slideIndex = slideIndex + 1;
      updateCarousel();
    });

  window.addEventListener("load", () => {
    if (!track) return;
    const originals = Array.from(track.children);
    originalCount = originals.length;
    originals.forEach((node) => track.appendChild(node.cloneNode(true)));
    setTimeout(() => {
      updateCarousel(false);
    }, 120);
  });
  window.addEventListener("resize", () => {
    setTimeout(() => {
      updateCarousel(false);
    }, 120);
  });

  let autoplayInterval = null;
  function startAutoplay() {
    if (autoplayInterval) return;
    autoplayInterval = setInterval(() => {
      slideIndex = slideIndex + 1;
      updateCarousel();
    }, 3000);
  }
  function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
  galleryCarousel &&
    galleryCarousel.addEventListener("mouseenter", stopAutoplay);
  galleryCarousel &&
    galleryCarousel.addEventListener("mouseleave", startAutoplay);
  galleryCarousel && galleryCarousel.addEventListener("focusin", stopAutoplay);
  galleryCarousel &&
    galleryCarousel.addEventListener("focusout", startAutoplay);
  startAutoplay();
})();

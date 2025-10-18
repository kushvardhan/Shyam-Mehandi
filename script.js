// Single consolidated script for nav, smooth scroll, header, carousel and lightbox
(function () {
  // Shared touch variables
  let touchStartX = 0;
  let touchEndX = 0;

  // Hero Carousel - Rotating Images
  const heroCarousel = document.getElementById("heroCarousel");
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll(".hero-slide");
    let currentSlide = 0;

    function rotateHeroSlides() {
      // The CSS animation handles the rotation automatically
      // This is just for reference - the animation is defined in CSS
      currentSlide = (currentSlide + 1) % slides.length;
    }

    // Optional: Rotate every 15 seconds (matches CSS animation)
    setInterval(rotateHeroSlides, 15000);
  }

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
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.classList.remove("open");
    lbImage && lbImage.classList.remove("zoomed");
    document.body.style.overflow = "";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lbImage.src = images[currentIndex];
    lbImage.classList.remove("zoomed");
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lbImage.src = images[currentIndex];
    lbImage.classList.remove("zoomed");
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

  // Touch swipe support for lightbox
  lightbox &&
    lightbox.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

  lightbox &&
    lightbox.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextImage();
      if (touchEndX - touchStartX > 50) prevImage();
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

  // Scroll-triggered animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document
    .querySelectorAll(".card, .service-card, .review-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  // Carousel infinite with clones and autoplay
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const galleryCarousel = document.getElementById("galleryCarousel");
  let slideIndex = 0,
    originalCount = 0,
    cardWidth = 0;
  const GAP = 16;

  function updateCardMetrics() {
    if (!track || !track.children.length) return;
    const first = track.children[0];
    cardWidth = first.getBoundingClientRect().width + GAP;
  }

  function updateCarousel(transition = true) {
    if (!track) return;
    updateCardMetrics();
    track.style.transition = transition
      ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
      : "none";
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
      stopAutoplay();
      startAutoplay();
    });

  nextBtn &&
    nextBtn.addEventListener("click", () => {
      slideIndex = slideIndex + 1;
      updateCarousel();
      stopAutoplay();
      startAutoplay();
    });

  // Touch swipe support for carousel
  galleryCarousel &&
    galleryCarousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    });

  galleryCarousel &&
    galleryCarousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        slideIndex = slideIndex + 1;
        updateCarousel();
      }
      if (touchEndX - touchStartX > 50) {
        slideIndex = slideIndex - 1;
        updateCarousel();
      }
      startAutoplay();
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
    }, 4000);
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

  // Reviews navigation with arrow buttons
  const reviewsGrid = document.querySelector(".reviews-grid");
  const reviewsPrevBtn = document.getElementById("reviewsPrev");
  const reviewsNextBtn = document.getElementById("reviewsNext");

  if (reviewsGrid && reviewsPrevBtn && reviewsNextBtn) {
    const cardWidth = 280 + 20; // card width + gap

    reviewsPrevBtn.addEventListener("click", () => {
      reviewsGrid.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    });

    reviewsNextBtn.addEventListener("click", () => {
      reviewsGrid.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    });

    // Touch swipe support for reviews
    let touchStartX = 0;
    reviewsGrid.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    reviewsGrid.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        reviewsGrid.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
      if (touchEndX - touchStartX > 50) {
        reviewsGrid.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    });
  }
})();

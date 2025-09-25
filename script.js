// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
navToggle &&
  navToggle.addEventListener("click", () => {
    const ul = nav.querySelector("ul");
    if (ul.style.display === "flex") ul.style.display = "none";
    else ul.style.display = "flex";
  });

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      // hide mobile nav after click
      const ul = nav.querySelector("ul");
      if (window.innerWidth <= 900) ul.style.display = "none";
    }
  });
});

// Header small on scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");
let currentIndex = -1;
const images = Array.from(galleryItems).map((i) => i.getAttribute("src"));

function openLightbox(idx) {
  currentIndex = idx;
  lbImage.src = images[currentIndex];
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  lbImage.src = "";
}
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lbImage.src = images[currentIndex];
}
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lbImage.src = images[currentIndex];
}

galleryItems.forEach((it, idx) => {
  it.addEventListener("click", () => openLightbox(idx));
});
lbClose.addEventListener("click", closeLightbox);
lbNext.addEventListener("click", nextImage);
lbPrev.addEventListener("click", prevImage);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

// Contact form (simple client-side handler)
const form = document.getElementById("contactForm");
form &&
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const message = data.get("message");
    // Build a WhatsApp prefilled message as fallback to real backend
    const text = `Name: ${name}%0APhone: ${phone}%0AMessage: ${message}`;
    const wa = `https://wa.me/919801664383?text=${text}`;
    window.open(wa, "_blank");
  });

// Set year
document.getElementById("year").textContent = new Date().getFullYear();

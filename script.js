const navbar = document.querySelector('.navbar');
const revealItems = document.querySelectorAll('.reveal');
const galleryImages = Array.from(document.querySelectorAll('.gallery img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCount = document.getElementById('lightbox-count');
const closeButton = document.querySelector('.lightbox-close');
const previousButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');
let activeImageIndex = 0;
let touchStartX = 0;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 40 ? '0 8px 20px rgba(0,0,0,.35)' : 'none';
});

function renderLightbox() {
  const image = galleryImages[activeImageIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxCount.textContent = `${activeImageIndex + 1} of ${galleryImages.length}`;
}

function openLightbox(index) {
  activeImageIndex = index;
  renderLightbox();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showNextImage() {
  activeImageIndex = (activeImageIndex + 1) % galleryImages.length;
  renderLightbox();
}

function showPreviousImage() {
  activeImageIndex = (activeImageIndex - 1 + galleryImages.length) % galleryImages.length;
  renderLightbox();
}

galleryImages.forEach((image, index) => image.addEventListener('click', () => openLightbox(index)));
closeButton.addEventListener('click', closeLightbox);
nextButton.addEventListener('click', showNextImage);
previousButton.addEventListener('click', showPreviousImage);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') showNextImage();
  if (event.key === 'ArrowLeft') showPreviousImage();
});

lightbox.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) < 50) return;
  if (distance < 0) showNextImage();
  else showPreviousImage();
}, { passive: true });

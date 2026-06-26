// ─────────────────────────────────────────
// script.js — Fernando Brígida Portfolio
// ─────────────────────────────────────────

// ── 1. NAVBAR: encolhe ao rolar ──
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── 2. MENU MOBILE ──
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  navToggle.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

// ── 3. LINK ATIVO NA NAVBAR ao rolar ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});

// ── 4. ANIMAÇÃO DE ENTRADA ao rolar (fade-in) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Adiciona a classe de animação nos cards
document.querySelectorAll('.skill-card, .project-card, .stat-card, .contact-link').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// CSS das animações injetado via JS
const animStyle = document.createElement('style');
animStyle.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(animStyle);

// ── 5. ANO ATUAL NO FOOTER ──
const footerYear = document.querySelector('footer p');
if (footerYear) {
  footerYear.innerHTML = footerYear.innerHTML.replace('2026', new Date().getFullYear());
}

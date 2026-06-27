// ─────────────────────────────────────────
// script.js — @codeempixel Landing Page
// ─────────────────────────────────────────

// ── 1. CURSOR PIXEL personalizado ──
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// Efeito ao clicar
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.6)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// ── 2. ANO NO FOOTER ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── 3. EFEITO GLITCH no nome ao passar o mouse ──
const heroName = document.querySelector('.hero-name');

if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.classList.add('glitch');
    setTimeout(() => heroName.classList.remove('glitch'), 600);
  });
}

// CSS do glitch injetado
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
  @keyframes glitch {
    0%   { text-shadow: none; transform: none; }
    20%  { text-shadow: -2px 0 #ff2d78, 2px 0 #00e5ff; transform: translate(-1px, 0); }
    40%  { text-shadow: 2px 0 #ff2d78, -2px 0 #00e5ff; transform: translate(1px, 0); }
    60%  { text-shadow: -1px 0 #7c3aed; transform: translate(0, 1px); }
    80%  { text-shadow: 1px 0 #00e5ff; transform: translate(0, -1px); }
    100% { text-shadow: none; transform: none; }
  }
  .glitch {
    animation: glitch 0.6s steps(1) forwards;
  }
`;
document.head.appendChild(glitchStyle);

// ── 4. FADE-IN nos cards de link ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.link-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateX(-12px)';
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.15s, box-shadow 0.15s, padding 0.15s';
  observer.observe(card);
});

// ── 5. EASTER EGG: sequência Konami ──
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      konamiIndex = 0;
      activateEasterEgg();
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  const msg = document.createElement('div');
  msg.className = 'pixel-text';
  msg.style.cssText = `
    position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
    background:#080810; border:2px solid #00e5ff;
    padding:2rem; text-align:center; z-index:9999;
    font-size:0.55rem; color:#00e5ff; line-height:2;
    box-shadow: 0 0 40px rgba(0,229,255,0.4);
  `;
  msg.innerHTML = '🎮 CÓDIGO ATIVADO!<br><br>+100 XP<br><br><small style="color:#5a5a78">você conhece os clássicos 👾</small>';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

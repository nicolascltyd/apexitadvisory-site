// Apex IT Advisory — interactions du site

// 1. Nav : état "scrollé"
const nav = document.querySelector('.nav');
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 2. Lien actif selon la section visible
const navLinks = [...document.querySelectorAll('.nav__links a')];
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function highlight() {
  const y = window.scrollY + window.innerHeight * 0.35;
  let current = null;
  for (const sec of sections) {
    if (sec.offsetTop <= y) current = sec.id;
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
highlight();
window.addEventListener('scroll', highlight, { passive: true });

// 3. Menu mobile
const burger = document.querySelector('.nav__burger');
function closeMenu() {
  document.body.classList.remove('menu-open');
  nav.classList.remove('menu-open');
  if (burger) burger.setAttribute('aria-expanded', 'false');
}
if (burger) {
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  // referme le menu après un clic sur un lien
  document.querySelectorAll('.nav__links a, .nav__cta').forEach(a =>
    a.addEventListener('click', closeMenu)
  );
}

// 4. Formulaire : composition d'un email (sans backend)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const nom = encodeURIComponent(form.nom.value.trim());
    const email = encodeURIComponent(form.email.value.trim());
    const message = encodeURIComponent(form.message.value.trim());
    const sujet = encodeURIComponent('Demande de diagnostic — ' + form.nom.value.trim());
    const corps = `Nom : ${decodeURIComponent(nom)}%0D%0AEmail : ${decodeURIComponent(email)}%0D%0A%0D%0A${decodeURIComponent(message)}`;
    const ok = document.getElementById('formOk');
    if (ok) ok.style.display = 'block';
    window.location.href = `mailto:nicolas@apexitadvisory.fr?subject=${sujet}&body=${corps}`;
  });
}

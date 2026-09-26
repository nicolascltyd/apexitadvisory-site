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

// 4. Formulaire : envoi via Web3Forms (sans backend)
const form = document.getElementById('contactForm');
if (form) {
  const ok = document.getElementById('formOk');
  const btn = form.querySelector('button[type="submit"]');
  const DEST = 'nicolas@apexitadvisory.fr';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (form.botcheck && form.botcheck.checked) return;

    const nom = form.nom.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const sujet = 'Demande de diagnostic — ' + nom;

    btn.disabled = true;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'a9373f1d-249f-4679-a495-01262fc13f23',
          subject: sujet,
          from_name: 'Site Apex IT Advisory',
          name: nom,
          email: email,
          replyto: email,
          message: message
        })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      ok.textContent = 'Merci, votre demande a bien été envoyée. Je reviens vers vous rapidement.';
      ok.style.display = 'block';
      form.reset();
    } catch (err) {
      const href = 'mailto:' + DEST +
        '?subject=' + encodeURIComponent(sujet) +
        '&body=' + encodeURIComponent('Nom : ' + nom + '\r\nEmail : ' + email + '\r\n\r\n' + message);
      ok.innerHTML = 'L\'envoi a échoué. Vous pouvez écrire directement à <a href="' + href + '">' + DEST + '</a>.';
      ok.style.display = 'block';
    } finally {
      btn.disabled = false;
    }
  });
}

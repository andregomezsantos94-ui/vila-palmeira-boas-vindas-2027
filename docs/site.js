const dialog = document.querySelector('#menu');
const menuButton = document.querySelector('.menu-button');
const menuNav = dialog.querySelector('nav');
const sectionLinks = document.querySelector('.sub .section-links');
const languageButton = document.querySelector('.language');

menuNav.append(sectionLinks.cloneNode(true));
menuButton.addEventListener('click', () => dialog.showModal());
dialog.querySelector('.close-button').addEventListener('click', () => dialog.close());
menuNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) dialog.close();
});

const translations = [...document.querySelectorAll('[data-en]')].map((element) => ({
  element,
  original: [...element.childNodes].map((node) => node.cloneNode(true)),
}));
const labels = [...document.querySelectorAll('[data-en-label]')].map((element) => ({
  element,
  original: element.getAttribute('aria-label'),
}));
const imageDescriptions = [...document.querySelectorAll('[data-en-alt]')].map((element) => ({
  element,
  original: element.alt,
}));

function applyLanguage(english) {
  document.documentElement.lang = english ? 'en' : 'pt-PT';
  languageButton.firstChild.textContent = english ? 'Português ' : 'English ';
  document.title = english ? 'Vila Palmeira — Welcome Guide 2027' : 'Vila Palmeira — Boas-vindas 2027';
  for (const { element, original } of translations) {
    element.replaceChildren(...(english ? [element.dataset.en] : original));
  }
  for (const { element, original } of labels) {
    element.setAttribute('aria-label', english ? element.dataset.enLabel : original);
  }
  for (const { element, original } of imageDescriptions) {
    element.alt = english ? element.dataset.enAlt : original;
  }
}

languageButton.addEventListener('click', () => {
  applyLanguage(document.documentElement.lang !== 'en');
});

const links = [...document.querySelectorAll('.section-links a')];
const sections = [...document.querySelectorAll('main section[id]')];
const header = document.querySelector('.header');

function updateNavigation() {
  const cutoff = header.getBoundingClientRect().bottom + 56;
  const current = sections.findLast((section) => section.getBoundingClientRect().top <= cutoff) ?? sections[0];
  for (const link of links) {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

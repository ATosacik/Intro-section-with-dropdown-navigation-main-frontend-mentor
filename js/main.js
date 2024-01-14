let windowWidth = window.innerWidth;
// gets windowWidth
window.addEventListener('resize', () => windowWidth = window.innerWidth);

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');

let isNavOpened = JSON.parse(nav.getAttribute('data-visible') || 'false');

navToggle.addEventListener('click', () => {
  isNavOpened = !isNavOpened;
  // isNavOpened variable is preventing page scrolling on smaller devices when navigation is opened
  document.body.style.overflow = isNavOpened ? 'hidden' : 'auto';
  // window is scrolled to the top if navigation is opened
  if (isNavOpened) window.scrollTo({ top: 0, behavior: 'smooth' });

  nav.setAttribute('data-visible', isNavOpened);
  navToggle.setAttribute('aria-expanded', isNavOpened);
});

window.addEventListener('resize', () => {
  if (windowWidth < 720) return;
  isNavOpened = false;
  document.body.style.overflow = 'auto';
  nav.setAttribute('data-visible', isNavOpened);
  navToggle.setAttribute('aria-expanded', isNavOpened);
});

for (const link of document.querySelectorAll('.nav__link--dropdown')) {
  const linkText = link.querySelector('p');
  const linkArrow = link.querySelector('img');
  let isDropdownClosed = true;

  linkArrow.style.transition = 'transform 150ms linear';
  // handles dropdown on click
  linkText.addEventListener('click', () => {
    if (windowWidth >= 720) return;
    linkArrow.style.transform = isDropdownClosed ? 'rotate(180deg)' : 'rotate(0deg)';
    link.querySelector('.dropdown').style.display = isDropdownClosed ? 'flex' : 'none';
    isDropdownClosed = !isDropdownClosed;
  });
  // resets dropdown on resize
  window.addEventListener('resize', () => {
    if (windowWidth < 720) return;
    linkArrow.style.transform = 'rotate(0deg)';
    link.querySelector('.dropdown').style.display = 'none';
    isDropdownClosed = true;
  });
}


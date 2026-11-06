document.addEventListener('DOMContentLoaded', function () {
  var htmlElement = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var themeIcon = themeToggle && themeToggle.querySelector('i');
  function updateIcon(theme) { if (!themeIcon) return; themeIcon.classList.toggle('fa-sun', theme === 'dark'); themeIcon.classList.toggle('fa-moon', theme !== 'dark'); }
  var initialTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  htmlElement.setAttribute('data-theme', initialTheme); updateIcon(initialTheme);
  if (themeToggle) themeToggle.addEventListener('click', function () { var nextTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; htmlElement.setAttribute('data-theme', nextTheme); localStorage.setItem('theme', nextTheme); updateIcon(nextTheme); });
  var page = location.pathname.split('/').pop() || 'index.html';
  var links = [['index.html', 'Home'], ['hobbies.html', 'Hobbies'], ['contact.html', 'Contact'], ['experience.html', 'Experience']];
  var navs = document.querySelectorAll('.nav-links');
  navs.forEach(function (nav) { nav.textContent = ''; links.forEach(function (item) { var li = document.createElement('li'); var anchor = document.createElement('a'); anchor.href = item[0]; anchor.textContent = item[1]; if (item[0] === page) { anchor.className = 'active'; anchor.setAttribute('aria-current', 'page'); } li.appendChild(anchor); nav.appendChild(li); }); });
  document.querySelectorAll('.btn-hire').forEach(function (link) { link.href = 'contact.html'; });
  if (page === 'index.html') { var image = document.querySelector('.hero-image'); if (image && !image.querySelector('.profile-divider')) { var divider = document.createElement('hr'); divider.className = 'profile-divider'; divider.setAttribute('aria-hidden', 'true'); image.appendChild(divider); } }
  var divider = document.querySelector('.profile-divider'); if (divider) { divider.style.width = 'min(100%, 420px)'; divider.style.margin = '1.25rem auto 0'; divider.style.border = '0'; divider.style.borderTop = '2px solid var(--border)'; }
  var menuButton = document.querySelector('.menu-button'); var navLinks = document.querySelector('.nav-links'); var menuIcon = menuButton && menuButton.querySelector('i');
  function closeMenu() { if (navLinks) navLinks.classList.remove('active'); if (menuButton) menuButton.setAttribute('aria-expanded', 'false'); if (menuIcon) menuIcon.classList.replace('fa-times', 'fa-bars'); }
  if (menuButton) menuButton.addEventListener('click', function () { var open = navLinks && navLinks.classList.toggle('active'); menuButton.setAttribute('aria-expanded', String(open)); if (menuIcon) { menuIcon.classList.toggle('fa-bars', !open); menuIcon.classList.toggle('fa-times', open); } });
  document.querySelectorAll('.nav-links a').forEach(function (link) { link.addEventListener('click', closeMenu); });
  var year = document.getElementById('copyright-year'); if (year) year.innerHTML = '&copy; ' + new Date().getFullYear() + ' Mike Soita. All Rights Reserved.';
});
document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');
  const updateIcon = (theme) => {
    if (!themeIcon) return;
    themeIcon.classList.toggle('fa-sun', theme === 'dark');
    themeIcon.classList.toggle('fa-moon', theme !== 'dark');
  };
  const initialTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  htmlElement.setAttribute('data-theme', initialTheme);
  updateIcon(initialTheme);
  themeToggle?.addEventListener('click', () => {
    const nextTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateIcon(nextTheme);
  });

  const page = location.pathname.split('/').pop() || 'index.html';
  const links = [['index.html', 'Home'], ['hobbies.html', 'Hobbies'], ['contact.html', 'Contact'], ['experience.html', 'Experience']];
  document.querySelectorAll('.nav-links').forEach((nav) => {
    nav.innerHTML = links.map(([href, label]) => `<li><a href="${href}"${href === page ? ' class="active" aria-current="page"' : ''}>${label}</a></li>`).join('');
  });
  document.querySelectorAll('.btn-hire').forEach((link) => link.setAttribute('href', 'contact.html'));
  if (page === 'index.html') {
    const image = document.querySelector('.hero-image');
    if (image && !image.querySelector('.profile-divider')) image.insertAdjacentHTML('beforeend', '<hr class="profile-divider" aria-hidden="true">');
  }
  const divider = document.querySelector('.profile-divider');
  if (divider) Object.assign(divider.style, { width: 'min(100%, 420px)', margin: '1.25rem auto 0', border: '0', borderTop: '2px solid var(--border)' });

  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');
  const menuIcon = menuButton?.querySelector('i');
  const closeMenu = () => { navLinks?.classList.remove('active'); menuButton?.setAttribute('aria-expanded', 'false'); menuIcon?.classList.replace('fa-times', 'fa-bars'); };
  menuButton?.addEventListener('click', () => { const open = navLinks?.classList.toggle('active'); menuButton.setAttribute('aria-expanded', String(open)); menuIcon?.classList.toggle('fa-bars', !open); menuIcon?.classList.toggle('fa-times', open); });
  document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) copyrightYear.innerHTML = `&copy; ${new Date().getFullYear()} Mike Soita. All Rights Reserved.`;
});
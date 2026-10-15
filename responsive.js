(() => {
  const closeMenu = (header, toggle) => { header.classList.remove('nav-is-open'); document.body.classList.remove('nav-menu-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation menu'); };
  document.querySelectorAll('.site-header, .cp-nav').forEach((header, index) => {
    const nav = header.querySelector(':scope > nav'); if (!nav) return;
    const toggle = document.createElement('button'); const id = nav.id || `site-navigation-${index + 1}`; nav.id = id;
    toggle.type = 'button'; toggle.className = 'mobile-menu-toggle'; toggle.setAttribute('aria-label', 'Open navigation menu'); toggle.setAttribute('aria-controls', id); toggle.setAttribute('aria-expanded', 'false'); toggle.innerHTML = '<span aria-hidden="true"></span>'; header.append(toggle);
    toggle.addEventListener('click', () => { const open = header.classList.toggle('nav-is-open'); document.body.classList.toggle('nav-menu-open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu'); });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu(header, toggle)));
    header.addEventListener('click', (event) => { if (header.classList.contains('nav-is-open') && !nav.contains(event.target) && event.target !== toggle && !toggle.contains(event.target)) closeMenu(header, toggle); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(header, toggle); });
    window.addEventListener('resize', () => { if (window.innerWidth > 850) closeMenu(header, toggle); });
  });
})();

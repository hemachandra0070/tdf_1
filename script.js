const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

// Keep visible URLs clean (without .html) while retaining current file routing.
if (window.history && typeof window.history.replaceState === 'function') {
  const { pathname, search, hash, protocol } = window.location;

  // Skip file:// to avoid awkward local filesystem URLs.
  if (protocol !== 'file:') {
    let prettyPath = pathname;

    if (prettyPath.endsWith('/index.html')) {
      prettyPath = prettyPath.slice(0, -'index.html'.length);
    } else if (prettyPath.endsWith('.html')) {
      prettyPath = prettyPath.slice(0, -'.html'.length);
    }

    if (prettyPath !== pathname) {
      window.history.replaceState(null, '', `${prettyPath}${search}${hash}`);
    }
  }
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

const yearNodes = document.querySelectorAll('[data-year]');
yearNodes.forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

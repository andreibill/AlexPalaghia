import { useState, useEffect } from 'react';
import TransitionLink from './TransitionLink';
import './Navbar.css';

const links = [
  { to: '/about', label: 'About' },
  { to: '/films', label: 'Films' },
  { to: '/commercial', label: 'Commercial' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <TransitionLink to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          Alex Palaghia
        </TransitionLink>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}
          aria-label="Main navigation"
        >
          {links.map(({ to, label }) => (
            <TransitionLink
              key={to}
              to={to}
              navLink
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
              end={to === '/'}
            >
              {label}
            </TransitionLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

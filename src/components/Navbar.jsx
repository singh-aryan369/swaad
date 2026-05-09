import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { contact } from '../data/contact.js';
import { EASE_OUT } from '../lib/motion.js';
import './Navbar.css';

const links = [
  { to: '/menu',     label: 'Menu' },
  { to: '/team',     label: 'Team' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/events',   label: 'Events' },
  { to: '/contact',  label: 'Contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className={`navbar ${scrolled || !isHome ? 'is-scrolled' : ''}`}
      >
        <div className="navbar-inner">
          <div className="nav-left">
            <button
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <MenuIcon size={22} />
            </button>
            <nav className="nav-desktop">
              <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>Menu</NavLink>
              <NavLink to="/team" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>Team</NavLink>
            </nav>
          </div>

          <Link to="/" className="logo logo-img" aria-label={`${contact.name} — home`}>
            <img src="/logo.webp" alt={contact.name} width="44" height="44" />
          </Link>

          <div className="nav-right">
            <nav className="nav-desktop">
              <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>Events</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>Contact</NavLink>
            </nav>
            <span className="nav-lang" aria-label="Language: English">EN</span>
            <Link to="/contact" className="nav-cta">Reserve</Link>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              className="nav-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nav-drawer-head">
                <Link to="/" className="logo logo-img">
                  <img src="/logo.webp" alt={contact.name} width="48" height="48" />
                </Link>
                <button
                  className="hamburger"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="nav-drawer-links">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) => isActive ? 'is-active' : ''}
                    >
                      <span className="num">0{i + 1}</span>
                      <span className="lbl">{l.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="nav-drawer-foot">
                <p>{contact.shortAddress}</p>
                <p>{contact.phone}</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

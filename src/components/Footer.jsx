import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { contact } from '../data/contact.js';
import { revealHeading, EASE_OUT } from '../lib/motion.js';
import './Footer.css';

const exploreLinks = [
  { to: '/menu',    label: 'Menu' },
  { to: '/team',    label: 'Team' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events',  label: 'Events' }
];

const socialIcon = { instagram: Instagram, facebook: Facebook };

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="footer-cta-text">
            <p className="eyebrow eyebrow-light">— Stay in Touch</p>
            <h2 className="h-section">A table is waiting.</h2>
          </div>
          <form className="footer-form" onSubmit={submit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              aria-label="Your email"
              required
            />
            <button type="submit" className="btn btn-primary footer-submit">
              {submitted ? 'Thank you ✓' : 'Subscribe'}
            </button>
          </form>
        </motion.div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-h">Explore</h4>
            <ul className="footer-nav">
              {exploreLinks.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
            <p className="footer-line footer-line-tight">
              <MapPin size={15} /> {contact.address}
            </p>
            <p className="footer-line footer-line-tight">
              <Clock size={15} /> {contact.hoursShort}
            </p>
          </div>

          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo footer-logo-img" aria-label={contact.name}>
              <img src="/logo.webp" alt={contact.name} width="120" height="120" />
            </Link>
            <p className="footer-tag">{contact.tagline}</p>
          </div>

          <div className="footer-col footer-col-right">
            <h4 className="footer-h">Reservations</h4>
            <p className="footer-line">
              <Phone size={15} />
              <a href={`tel:${contact.phoneTel}`}>{contact.phone}</a>
            </p>
            <p className="footer-line">
              <Mail size={15} />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 {contact.name}. Crafted with love and a little ghee.</p>
          <div className="footer-socials" aria-label="Social media">
            {contact.socials.map((s) => {
              const Icon = socialIcon[s.icon];
              return (
                <a key={s.label} href={s.href} aria-label={s.label}>
                  {Icon ? <Icon size={18} /> : s.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

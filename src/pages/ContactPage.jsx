import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Navigation, Star } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { contact } from '../data/contact.js';
import { EASE_OUT } from '../lib/motion.js';
import './ContactPage.css';

const MAP_QUERY = encodeURIComponent(contact.mapQuery);
// Public Google Maps embed format — works without an API key for basic display
const MAP_EMBED = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

const INITIAL_FORM = { name: '', email: '', date: '', guests: '2', message: '' };
const socialIcon = { instagram: Instagram, facebook: Facebook };

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm(INITIAL_FORM);
  };

  return (
    <>
      <PageHeader
        eyebrow="Find Us"
        title="Visit Swaad"
        subtitle="Drop in for a quick lunch, book a long evening — or just stop by to say hello to the team."
      />

      <section className="map-section">
        <div className="map-shell">
          <motion.aside
            className="map-card"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div className="map-card-head">
              <h2 className="map-card-title">{contact.name}</h2>
              <p className="map-card-sub">{contact.tagline}</p>
              <div className="map-card-rating" aria-label={`Rating: ${contact.rating.score} out of 5`}>
                <span className="rating-num">{contact.rating.score}</span>
                <span className="rating-stars" aria-hidden="true">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" stroke="none" />
                  ))}
                </span>
                <span className="rating-count">· {contact.rating.count.toLocaleString()} reviews</span>
              </div>
            </div>

            <div className="map-card-row">
              <MapPin size={18} />
              <div>
                <p>{contact.address}</p>
                <a className="map-card-link" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
                  <Navigation size={14} /> Get directions
                </a>
              </div>
            </div>

            <div className="map-card-row">
              <Phone size={18} />
              <div>
                <p><a href={`tel:${contact.phoneTel}`}>{contact.phone}</a></p>
                <p className="muted">Reservations recommended</p>
              </div>
            </div>

            <div className="map-card-row">
              <Mail size={18} />
              <div>
                <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
              </div>
            </div>

            <div className="map-card-row">
              <Clock size={18} />
              <div className="hours">
                {contact.hours.map((h) => (
                  <div key={h.day} className="hours-row">
                    <span>{h.day}</span>
                    <span className={h.time === 'Closed' ? 'closed' : ''}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="map-card-actions">
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
                <Navigation size={16} /> Directions
              </a>
              <a href="#reserve" className="btn btn-ghost">Reserve a table</a>
            </div>

            <div className="map-card-socials">
              {contact.socials.map((s) => {
                const Icon = socialIcon[s.icon];
                return (
                  <a key={s.label} href={s.href} aria-label={s.label}>
                    {Icon ? <Icon size={18} /> : s.label}
                  </a>
                );
              })}
            </div>
          </motion.aside>

          <motion.div
            className="map-frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <iframe
              title={`${contact.name} on the map`}
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-pin" aria-hidden="true">
              <span className="map-pin-pulse" />
              <MapPin size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="reserve" id="reserve">
        <div className="container reserve-grid">
          <div className="reserve-intro">
            <p className="eyebrow">— Reserve a Table</p>
            <h2 className="h-section">A table is waiting.</h2>
            <p className="lede">
              Tell us when, how many, and any special asks. We'll confirm by email
              within the hour during business hours.
            </p>
          </div>

          <form className="reserve-form" onSubmit={submit}>
            <label>
              <span>Your name</span>
              <input type="text" required value={form.name} onChange={update('name')} placeholder="Aryan D." />
            </label>
            <label>
              <span>Email</span>
              <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
            </label>
            <label>
              <span>Date & time</span>
              <input type="datetime-local" required value={form.date} onChange={update('date')} />
            </label>
            <label>
              <span>Guests</span>
              <select value={form.guests} onChange={update('guests')}>
                {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                ))}
                <option value="11+">11+</option>
              </select>
            </label>
            <label className="full">
              <span>Anything we should know?</span>
              <textarea rows="3" value={form.message} onChange={update('message')} placeholder="Birthday, allergies, seating preferences…" />
            </label>
            <button type="submit" className="btn btn-primary reserve-submit">
              {sent ? 'Reservation requested ✓' : 'Reserve my table'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

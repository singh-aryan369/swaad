import { motion } from 'framer-motion';
import { events } from '../data/events.js';
import './Events.css';

export default function Events() {
  return (
    <section className="events" id="events">
      <div className="container">
        <div className="events-head">
          <p className="eyebrow">— Host With Us</p>
          <motion.h2
            className="h-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Events
          </motion.h2>
        </div>

        <div className="event-grid">
          {events.map((e, i) => (
            <motion.article
              key={e.label}
              className="event-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="event-img-wrap">
                <img src={e.img} alt={e.label} loading="lazy" />
              </div>
              <div className="event-overlay">
                <div className="event-label-row">
                  <h3 className="h-card">{e.label}</h3>
                  <span className="event-arrow">→</span>
                </div>
                <p className="event-desc">{e.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

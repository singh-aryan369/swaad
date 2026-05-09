import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { festivals } from '../data/festivals.js';
import { EASE_OUT } from '../lib/motion.js';
import './Festivals.css';

export default function Festivals() {
  return (
    <section className="festivals" id="festivals">
      <div className="container">
        <div className="festivals-head">
          <p className="eyebrow eyebrow-light">— Celebrate With Us</p>
          <motion.h2
            className="h-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            Festivals at Swaad
          </motion.h2>
          <p className="lede festival-sub">
            Celebrate India's most cherished moments with us — special menus,
            live music and the joy of shared tables.
          </p>
        </div>

        <div className="festival-grid">
          {festivals.map((f, i) => (
            <motion.article
              key={f.name}
              className="festival-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_OUT }}
            >
              <div className="festival-img">
                <img src={f.img} alt={f.name} loading="lazy" />
              </div>
              <div className="festival-body">
                <div className="festival-row">
                  <h3 className="h-card">{f.name}</h3>
                  <span className="festival-date">{f.date}</span>
                </div>
                <p className="festival-sub-lbl">{f.subtitle}</p>
                <p className="festival-desc">{f.desc}</p>
                <Link to="/contact" className="festival-cta">Reserve →</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

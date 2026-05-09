import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { team } from '../data/team.js';
import './Team.css';

const VISIBLE = 4;

export default function Team() {
  const [start, setStart] = useState(0);

  const visible = Array.from({ length: VISIBLE }, (_, i) =>
    team[(start + i) % team.length]
  );

  const prev = () => setStart((s) => (s - 1 + team.length) % team.length);
  const next = () => setStart((s) => (s + 1) % team.length);

  return (
    <section className="team" id="team">
      <div className="container">
        <div className="team-top">
          <div className="team-left">
            <p className="eyebrow">— The Faces Behind the Flavour</p>
            <motion.h2
              className="h-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Our team
            </motion.h2>
            <div className="team-controls">
              <button className="icon-btn" aria-label="Previous team members" onClick={prev}>
                <ArrowLeft size={18} />
              </button>
              <button className="icon-btn" aria-label="Next team members" onClick={next}>
                <ArrowRight size={18} />
              </button>
              <span className="team-counter">
                {String(start + 1).padStart(2, '0')}
                <span> / {String(team.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>
          <div className="team-right">
            <p className="lede">
              A family of cooks, dreamers and craftsmen — bringing decades of
              regional Indian expertise to every plate we serve.
            </p>
          </div>
        </div>

        <div className="team-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((m, i) => (
              <motion.article
                key={`${m.name}-${start}`}
                className="team-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="team-img-wrap">
                  <img src={m.img} alt={m.name} loading="lazy" />
                </div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role">{m.role}</p>
                <p className="team-bio">{m.bio}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

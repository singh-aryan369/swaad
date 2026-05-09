import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import CountUpPrice from '../components/CountUpPrice.jsx';
import DishModal from '../components/DishModal.jsx';
import { menuCategories } from '../data/menu.js';
import { team } from '../data/team.js';
import { EASE_OUT, fadeUp } from '../lib/motion.js';
import './Home.css';

const FEATURED_IDS = ['tandoor', 'curries', 'biryani', 'desserts'];
const featured = FEATURED_IDS
  .map((id) => menuCategories.find((c) => c.id === id)?.dishes?.[0])
  .filter(Boolean);

export default function Home() {
  const [selectedDish, setSelectedDish] = useState(null);
  const onCardKey = (e, dish) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedDish(dish);
    }
  };

  return (
    <>
      <Hero />
      <About />

      <section className="featured">
        <div className="container">
          <div className="featured-head">
            <div>
              <p className="eyebrow">— Tonight's Highlights</p>
              <h2 className="h-section">Signature dishes</h2>
            </div>
            <Link to="/menu" className="featured-cta">
              See the full menu <ArrowRight size={16} />
            </Link>
          </div>

          <div className="featured-grid">
            {featured.map((d, i) => (
              <motion.article
                key={d.name}
                className="featured-card dish-card-clickable"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                role="button"
                tabIndex={0}
                aria-label={`See details for ${d.name}`}
                onClick={() => setSelectedDish({ ...d, category: 'Signature' })}
                onKeyDown={(e) => onCardKey(e, { ...d, category: 'Signature' })}
              >
                <div className="featured-img">
                  <img src={d.img} alt={d.name} loading="lazy" />
                  {d.tag && <span className="featured-tag">{d.tag}</span>}
                </div>
                <div className="featured-meta">
                  <h3>{d.name}</h3>
                  <CountUpPrice value={d.price} />
                </div>
                <p>{d.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Team teaser ============ */}
      <section className="team-teaser">
        <div className="container team-teaser-grid">
          <motion.div
            className="team-teaser-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <p className="eyebrow">— The People in Our Kitchen</p>
            <h2 className="h-section">Cooked by hand. Served like family.</h2>
            <p className="lede">
              Six chefs, twelve regions of India, and a kitchen that has burned
              every night for twenty-five years. Meet the people behind the plates.
            </p>
            <Link to="/team" className="btn btn-primary home-team-btn">
              Meet the team <ArrowUpRight size={16} />
            </Link>
          </motion.div>
          <div className="team-teaser-stack">
            {team.slice(0, 3).map((m, i) => (
              <motion.figure
                key={m.name}
                className="team-teaser-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE_OUT }}
              >
                <img src={m.img} alt={m.name} loading="lazy" />
                <figcaption>
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Visit us CTA ============ */}
      <section className="visit-cta">
        <div className="container visit-cta-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow eyebrow-light">— Brick Quarter, Mumbai</p>
            <h2 className="h-section">Come see for yourself.</h2>
            <p className="lede visit-sub">
              We're open Tuesday through Sunday. Walk-ins welcome — but a table is
              never guaranteed past seven on a Friday.
            </p>
            <div className="visit-actions">
              <Link to="/contact" className="btn btn-primary">Find us & reserve</Link>
              <Link to="/events" className="btn btn-ghost btn-ghost-light">See upcoming events</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </>
  );
}

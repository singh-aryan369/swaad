import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import './About.css';

const stories = [
  {
    title: 'Who are we?',
    body: "From the spice-laden lanes of Old Delhi to the coastal kitchens of Kerala, Swaad brings the soul of India to your plate. Every dish is a story — of grandmothers' recipes, of fragrant masalas hand-ground at dawn, of a tandoor that has burned for generations."
  },
  {
    title: 'Why we cook.',
    body: 'We believe food is memory. A bite of dal-chawal that tastes like a Sunday afternoon. A spoon of kheer that brings back a wedding from twenty years ago. We cook to keep those memories alive, and to make new ones at your table.'
  },
  {
    title: 'How we source.',
    body: 'Our spices come direct from small Kerala farms. Our paneer is hand-pressed each morning. Our basmati is aged for two years before it sees the pot. Authenticity isn\'t a buzzword — it\'s a daily commitment.'
  }
];

const gallery = [
  { src: '/images/photo-1555396273-367ea4eb4db5.jpg', alt: 'Restaurant interior with warm lighting' },
  { src: '/images/photo-1601050690597-df0568f70950.jpg', alt: 'Tandoor oven with naan' },
  { src: '/images/photo-1414235077428-338989a2e8c0.jpg', alt: 'Guests dining together' },
  { src: '/images/photo-1596040033229-a9821ebd058d.jpg', alt: 'Hand-ground spices' }
];

export default function About() {
  const [idx, setIdx] = useState(0);
  const story = stories[idx];

  const prev = () => setIdx((i) => (i - 1 + stories.length) % stories.length);
  const next = () => setIdx((i) => (i + 1) % stories.length);

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <p className="eyebrow">— Our Story</p>
            <motion.h2
              key={story.title}
              className="h-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {story.title}
            </motion.h2>
            <div className="about-controls">
              <button className="icon-btn" aria-label="Previous story" onClick={prev}>
                <ArrowLeft size={18} />
              </button>
              <button className="icon-btn" aria-label="Next story" onClick={next}>
                <ArrowRight size={18} />
              </button>
              <span className="counter">
                {String(idx + 1).padStart(2, '0')}
                <span> / {String(stories.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>
          <div className="about-right">
            <motion.p
              key={story.body}
              className="about-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {story.body}
            </motion.p>
            <div className="about-stats">
              <div>
                <span className="stat-num">25+</span>
                <span className="stat-lbl">Years in the kitchen</span>
              </div>
              <div>
                <span className="stat-num">12</span>
                <span className="stat-lbl">Indian regions on the menu</span>
              </div>
              <div>
                <span className="stat-num">100%</span>
                <span className="stat-lbl">Hand-ground masalas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-gallery">
        {gallery.map((g, i) => (
          <motion.div
            key={g.src}
            className="about-tile"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={g.src} alt={g.alt} loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import './Gallery.css';

const moments = [
  { src: '/images/photo-1517248135467-4c7edcad34c4.jpg', alt: 'Warm dining lights', span: 'tall' },
  { src: '/images/photo-1552566626-52f8b828add9.jpg', alt: 'Spice market colours', span: 'wide' },
  { src: '/images/photo-1596040033229-a9821ebd058d.jpg', alt: 'Hand-ground masalas', span: 'square' },
  { src: '/images/thali.jpg', alt: 'Plating a thali', span: 'square' },
  { src: '/images/photo-1633504581786-316c8002b1b9.jpg', alt: 'Skewers on the tandoor', span: 'tall' },
  { src: '/images/fresh-herbs-and-lemons.avif', alt: 'Fresh herbs and lemons', span: 'square' },
  { src: '/images/photo-1414235077428-338989a2e8c0.jpg', alt: 'Friends at the table', span: 'wide' },
  { src: '/images/photo-1565557623262-b51c2513a641.jpg', alt: 'A simmering pot', span: 'square' }
];

export default function Gallery() {
  return (
    <section className="gallery" id="moments">
      <div className="container">
        <div className="gallery-head">
          <p className="eyebrow">— Moments at Swaad</p>
          <motion.h2
            className="h-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            A glimpse inside.
          </motion.h2>
          <p className="lede gallery-sub">
            Steam rising from a fresh tandoor, the colours of a Mumbai spice market,
            laughter at a long table — the small, beautiful moments that make Swaad.
          </p>
        </div>

        <div className="gallery-grid">
          {moments.map((m, i) => (
            <motion.figure
              key={m.src}
              className={`gallery-tile gallery-tile--${m.span}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={m.src} alt={m.alt} loading="lazy" />
              <figcaption className="gallery-cap">{m.alt}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

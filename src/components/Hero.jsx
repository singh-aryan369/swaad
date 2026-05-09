import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_OUT } from '../lib/motion.js';
import './Hero.css';

const titleVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 }
  }
};

const wordVariant = {
  hidden: { y: 60, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT }
  }
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="hero">
      <motion.div
        className="hero-image"
        style={{ y: imgY, scale: imgScale }}
        aria-hidden="true"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <motion.div className="hero-content" style={{ y: textY, opacity: textOpacity }}>
        <div className="container">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          >
            <span className="dot" aria-hidden="true" /> Authentic Indian Cuisine
          </motion.p>

          <motion.h1
            className="hero-title h-display"
            variants={titleVariant}
            initial="hidden"
            animate="show"
          >
            <span className="line"><motion.span variants={wordVariant}>Made in India.</motion.span></span>
            <span className="line"><motion.span variants={wordVariant}>Loved <em>everywhere</em>.</motion.span></span>
          </motion.h1>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: EASE_OUT }}
          >
            <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
            <Link to="/contact" className="btn btn-ghost">Reserve a Table</Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}

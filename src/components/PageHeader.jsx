import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { EASE_OUT } from '../lib/motion.js';
import './PageHeader.css';

export default function PageHeader({ eyebrow, title, subtitle }) {
  const { pathname } = useLocation();
  // Routes are single-segment by design — first slash strip is sufficient
  const crumb = pathname.replace('/', '') || 'home';

  return (
    <section className="page-header">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span aria-current="page">{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</span>
        </nav>
        {eyebrow && <p className="eyebrow eyebrow-light">— {eyebrow}</p>}
        <motion.h1
          className="h-display page-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="lede page-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

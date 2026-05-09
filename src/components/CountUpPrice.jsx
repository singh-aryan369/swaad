import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { EASE_OUT } from '../lib/motion.js';

const PRICE_RX = /^([^\d-]*)(\d+)(.*)$/;

export default function CountUpPrice({ value, duration = 1.2, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mv = useMotionValue(0);

  const match = PRICE_RX.exec(String(value));
  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : '';

  const text = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, target, { duration, ease: EASE_OUT });
    return () => ctrl.stop();
  }, [inView, target, duration, mv]);

  if (!match) return <span ref={ref} className={className}>{value}</span>;

  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}

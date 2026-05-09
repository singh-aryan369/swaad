// Shared motion constants for framer-motion. Mirrors --ease-out in styles/index.css.
export const EASE_OUT = [0.22, 1, 0.36, 1];

// Default viewport hint for whileInView — once-only, ~1/3 visible
export const REVEAL_VIEWPORT = { once: true, amount: 0.3 };

// Stagger-friendly fade-up. Use as: <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={REVEAL_VIEWPORT}/>
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE_OUT }
  })
};

// Section heading reveal. Use as: <motion.h2 {...revealHeading}>
export const revealHeading = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, ease: EASE_OUT }
};

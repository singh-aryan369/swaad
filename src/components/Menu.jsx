import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { menuCategories, drinks } from '../data/menu.js';
import { fadeUp, EASE_OUT } from '../lib/motion.js';
import CountUpPrice from './CountUpPrice.jsx';
import DishModal from './DishModal.jsx';
import './Menu.css';

export default function Menu() {
  const [activeCat, setActiveCat] = useState(menuCategories[1].id);
  const [drinkKey, setDrinkKey] = useState('chai');
  const [drinkIdx, setDrinkIdx] = useState(0);
  const [selectedDish, setSelectedDish] = useState(null);

  const cat = menuCategories.find((c) => c.id === activeCat);
  const drinkCat = drinks[drinkKey];
  const drink = drinkCat.items[drinkIdx];

  const cycleCat = (dir) => {
    const i = menuCategories.findIndex((c) => c.id === activeCat);
    const next = (i + dir + menuCategories.length) % menuCategories.length;
    setActiveCat(menuCategories[next].id);
  };

  const cycleDrink = (dir) => {
    setDrinkIdx((i) => (i + dir + drinkCat.items.length) % drinkCat.items.length);
  };

  const setDrinkCat = (key) => {
    setDrinkKey(key);
    setDrinkIdx(0);
  };

  const openDish = (dish, categoryLabel) =>
    setSelectedDish({ ...dish, category: categoryLabel });

  const onCardKey = (e, dish, categoryLabel) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDish(dish, categoryLabel);
    }
  };

  return (
    <section className="menu" id="menu">
      <div className="container">
        <motion.div
          className="menu-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="eyebrow">— A Taste of India</p>
          <h2 className="h-section">Menu</h2>
          <p className="lede menu-sub">
            A journey through the regions of India — from smoky kebabs of the north,
            to slow-cooked curries of the south. Crafted with love, served with warmth.
          </p>
          <p className="menu-hint">Tap any dish for details &amp; ordering →</p>
        </motion.div>

        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {menuCategories.map((c) => {
            const isActive = c.id === activeCat;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                className={`tab-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveCat(c.id)}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="tab-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="tab-lbl">{c.label}</span>
              </button>
            );
          })}
        </div>

        <div className="menu-pane-wrap">
          <button
            className="icon-btn carousel-arrow left"
            aria-label="Previous category"
            onClick={() => cycleCat(-1)}
          >
            <ArrowLeft size={18} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              className="dish-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {cat.dishes.map((d, i) => (
                <motion.article
                  key={d.name}
                  className="dish-card dish-card-clickable"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  role="button"
                  tabIndex={0}
                  aria-label={`See details for ${d.name}`}
                  onClick={() => openDish(d, cat.label)}
                  onKeyDown={(e) => onCardKey(e, d, cat.label)}
                >
                  <div className="dish-img-wrap">
                    <img src={d.img} alt={d.name} loading="lazy" />
                    {d.tag && <span className="dish-tag">{d.tag}</span>}
                  </div>
                  <div className="dish-meta">
                    <h3 className="dish-name">{d.name}</h3>
                    <CountUpPrice value={d.price} className="dish-price" />
                  </div>
                  <p className="dish-desc">{d.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            className="icon-btn carousel-arrow right"
            aria-label="Next category"
            onClick={() => cycleCat(1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="drinks">
          <div className="drink-visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={drink.img}
                className="drink-img"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <img src={drink.img} alt={drink.name} loading="lazy" />
              </motion.div>
            </AnimatePresence>
            <div className="drink-controls">
              <button className="icon-btn" aria-label="Previous drink" onClick={() => cycleDrink(-1)}>
                <ArrowLeft size={18} />
              </button>
              <button className="icon-btn" aria-label="Next drink" onClick={() => cycleDrink(1)}>
                <ArrowRight size={18} />
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={drink.name}
                className="drink-meta"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="drink-row">
                  <h4>{drink.name}</h4>
                  <CountUpPrice value={drink.price} />
                </div>
                <p>{drink.desc}</p>
                <button
                  type="button"
                  className="drink-order"
                  onClick={() => openDish(drink, drinkCat.label)}
                >
                  <MessageCircle size={14} /> Order this drink
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="drink-cats">
            {Object.entries(drinks).map(([key, d]) => (
              <button
                key={key}
                className={`drink-cat ${drinkKey === key ? 'is-active' : ''}`}
                onClick={() => setDrinkCat(key)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}

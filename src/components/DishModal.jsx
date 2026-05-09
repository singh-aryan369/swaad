import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Phone, Clock, Flame } from 'lucide-react';
import { contact } from '../data/contact.js';
import { EASE_OUT } from '../lib/motion.js';
import './DishModal.css';

const buildWhatsAppLink = (dishName) => {
  const message = encodeURIComponent(
    `Hi ${contact.name}, I'd like to order: ${dishName}. Could you confirm availability and delivery time?`
  );
  return `https://wa.me/${contact.whatsapp}?text=${message}`;
};

export default function DishModal({ dish, onClose }) {
  // Lock body scroll + close on ESC while open
  useEffect(() => {
    if (!dish) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [dish, onClose]);

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          className="dish-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="dish-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-modal-title"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="dish-modal-close"
              onClick={onClose}
              aria-label="Close dish details"
            >
              <X size={20} />
            </button>

            <div className="dish-modal-grid">
              <div className="dish-modal-img">
                <img src={dish.img} alt={dish.name} />
                {dish.tag && <span className="dish-modal-tag">{dish.tag}</span>}
              </div>

              <div className="dish-modal-body">
                {dish.category && <p className="eyebrow">— {dish.category}</p>}
                <h3 id="dish-modal-title" className="h-display dish-modal-name">{dish.name}</h3>
                <p className="dish-modal-price">{dish.price}</p>
                <p className="dish-modal-desc">{dish.desc}</p>

                <ul className="dish-modal-meta">
                  <li><Clock size={14} /> Ready in 15–20 minutes</li>
                  <li><Flame size={14} /> Hand-prepared in our tandoor kitchen</li>
                  <li>· Pairs well with our house masala chai or mango lassi</li>
                </ul>

                <div className="dish-modal-actions">
                  <a
                    href={buildWhatsAppLink(dish.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary dish-modal-cta"
                  >
                    <MessageCircle size={16} /> Order on WhatsApp
                  </a>
                  <a
                    href={`tel:${contact.phoneTel}`}
                    className="btn btn-ghost"
                  >
                    <Phone size={16} /> Call {contact.phone}
                  </a>
                </div>

                <p className="dish-modal-foot">
                  Or reserve a table to enjoy it in-house — visit our{' '}
                  <a href="/contact">contact page</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

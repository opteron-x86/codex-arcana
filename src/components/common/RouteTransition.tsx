import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface RouteTransitionProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide' | 'scale' | 'combat' | 'scroll';
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  },
  combat: {
    initial: { opacity: 0, y: 20, rotateX: 90 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: -20, rotateX: -90 },
  },
  scroll: {
    initial: { opacity: 0, height: 0, y: 100 },
    animate: { opacity: 1, height: "auto", y: 0 },
    exit: { opacity: 0, height: 0, y: -100 },
  },
};

const getVariantByPath = (pathname: string) => {
  if (pathname.includes('game')) return 'combat';
  if (pathname.includes('collection')) return 'scroll';
  if (pathname.includes('auth')) return 'fade';
  if (pathname.includes('shop')) return 'scale';
  return 'slide';
};

const RouteTransition: React.FC<RouteTransitionProps> = ({ 
  children,
  variant: propVariant 
}) => {
  const location = useLocation();
  const variant = propVariant || getVariantByPath(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants[variant]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.3 
        }}
      >
        {/* Overlay effect for combat transitions */}
        {variant === 'combat' && (
          <motion.div
            className="fixed inset-0 bg-ember/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Scroll effect for collection transitions */}
        {variant === 'scroll' && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
        )}

        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteTransition;
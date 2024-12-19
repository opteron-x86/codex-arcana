import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Flame, Scroll, Shield, Sword } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  variant?: 'flame' | 'scroll' | 'combat' | 'souls';
}

// Animation variants for different loading icons
const iconVariants: Variants = {
  flame: {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  scroll: {
    initial: { rotateZ: 0 },
    animate: {
      rotateZ: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },
  combat: {
    initial: { x: 0, rotateZ: 0 },
    animate: {
      x: [-20, 20],
      rotateZ: [-10, 10],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  souls: {
    initial: { y: 0, opacity: 0.5 },
    animate: {
      y: [-10, 10],
      opacity: [0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message,
  variant = 'flame'
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messages = message ? [message] : loadingMessages.general;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [messages]);

  const getLoadingIcon = () => {
    switch (variant) {
      case 'flame':
        return <Flame className="w-16 h-16 text-ember" />;
      case 'scroll':
        return <Scroll className="w-16 h-16 text-gold" />;
      case 'combat':
        return (
          <div className="relative">
            <Shield className="w-16 h-16 text-gold absolute" />
            <Sword className="w-16 h-16 text-ember" />
          </div>
        );
      case 'souls':
        return (
          <div className="relative">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ y: 0, opacity: 0.3 }}
                animate={{
                  y: [-20, 20],
                  opacity: [0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.3,
                }}
              >
                <Flame className="w-16 h-16 text-ember" style={{ opacity: 0.3 + (i * 0.2) }} />
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-bg z-50 flex flex-col items-center justify-center"
    >
      <motion.div
        variants={iconVariants[variant]}
        initial="initial"
        animate="animate"
      >
        {getLoadingIcon()}
      </motion.div>
      
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-6 text-gold font-serif text-xl"
      >
        {messages[currentMessageIndex]}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
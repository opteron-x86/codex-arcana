import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Flame, Scroll, Shield, Sword } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  variant?: 'flame' | 'scroll' | 'combat' | 'souls';
}

// Loading messages by category
const loadingMessages = {
  general: [
    "Kindling the flames...",
    "Gathering ancient power...",
    "Channeling dark magic...",
    "Forging your destiny..."
  ],
  combat: [
    "Preparing your deck...",
    "Summoning opponents...",
    "Aligning the battlefield...",
    "Awakening card spirits..."
  ],
  collection: [
    "Gathering your cards...",
    "Unlocking treasures...",
    "Reading ancient scrolls...",
    "Consulting the archives..."
  ],
  auth: [
    "Verifying your soul...",
    "Opening the gates...",
    "Checking credentials...",
    "Securing the realm..."
  ]
};

// Animation variants for different loading icons
const iconVariants: Variants = {
  flame: {
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
    animate: {
      rotateZ: [0, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },
  combat: {
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
  const [randomMessage, setRandomMessage] = useState('');
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
                <Flame className={`w-16 h-16 text-ember opacity-${30 + (i * 20)}`} />
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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dark-gray/20 to-transparent" />
      
      {/* Loading Icon */}
      <motion.div
        variants={iconVariants[variant]}
        animate="animate"
      >
        {getLoadingIcon()}
      </motion.div>
      
      {/* Message */}
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-6 text-gold font-serif text-xl"
      >
        {messages[currentMessageIndex]}
        <motion.span
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ...
        </motion.span>
      </motion.div>

      {/* Runes/Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${i * 90}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className="w-12 h-12 border-2 border-gold/20 rounded-full" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Scroll, Sword, Crown, Book, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

const DarkSoulsNav = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/game', icon: <Sword />, label: 'Battle' },
    { path: '/collection', icon: <Book />, label: 'Collection' },
    { path: '/shop', icon: <ShoppingBag />, label: 'Shop' },
    { path: '/leaderboard', icon: <Crown />, label: 'Leaderboard' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 h-screen w-20 bg-dark-bg border-r border-medium-gray/30
                 flex flex-col items-center py-8 shadow-lg z-50"
      initial={false}
      animate={{ width: isOpen ? "200px" : "80px" }}
    >
      {/* Logo/Home */}
      <Link to="/">
        <motion.div 
          className="mb-12 cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Flame 
            size={32} 
            className="text-ember animate-pulse-slow group-hover:text-gold 
                       transition-colors duration-500"
          />
        </motion.div>
      </Link>

      {/* Navigation Items */}
      <div className="flex flex-col gap-8">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <motion.div
              className={`flex items-center gap-4 px-4 py-2 cursor-pointer
                         ${location.pathname === item.path ? 'text-gold' : 'text-medium-gray'}
                         hover:text-gold transition-colors duration-300
                         relative group`}
              whileHover={{ x: 5 }}
            >
              {/* Icon */}
              <div className="w-8 h-8 flex items-center justify-center relative">
                {item.icon}
                
                {/* Active Indicator */}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gold/20 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>

              {/* Label */}
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-serif whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Hover Effect */}
              <motion.div
                className="absolute left-0 w-1 h-full bg-gold/0 group-hover:bg-gold/50
                          transition-colors duration-300"
                whileHover={{ scaleY: 1.2 }}
              />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto flex flex-col items-center gap-4">
        <button
          onClick={logout}
          className="text-medium-gray hover:text-ember transition-colors duration-300
                     flex items-center gap-2"
        >
          <Scroll size={20} />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-serif"
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default DarkSoulsNav;
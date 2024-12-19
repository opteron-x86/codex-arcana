import React from 'react';
import { motion } from 'framer-motion';

interface CardValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface CardProps {
  id: string;
  name: string;
  values: CardValues;
  element?: string;
  owner: string;
  isSelected?: boolean;
  isPlayable?: boolean;
  onClick?: () => void;
}

const GameCard: React.FC<CardProps> = ({
  name,
  values,
  element,
  owner,
  isSelected,
  isPlayable,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={isPlayable ? { scale: 1.05, y: -5 } : {}}
      whileTap={isPlayable ? { scale: 0.95 } : {}}
      animate={isSelected ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
      className={`relative w-24 h-32 cursor-${isPlayable ? 'pointer' : 'default'}`}
      onClick={isPlayable ? onClick : undefined}
    >
      <div 
        className={`absolute inset-0 rounded-lg transform transition-all duration-300
          ${isSelected ? 'shadow-glow-gold' : 'shadow-card'}
          ${owner === 'player' ? 'bg-dark-gray' : 'bg-ember/20'}
          border-2 
          ${isSelected ? 'border-gold' : owner === 'player' ? 'border-steel-gray' : 'border-ember/50'}
          overflow-hidden
        `}
      >
        {/* Card Background */}
        <div className="absolute inset-0 bg-grunge opacity-10" />
        
        {/* Card Content */}
        <div className="relative h-full p-2 flex flex-col">
          {/* Top Value */}
          <div className="text-center">
            <div className="bg-dark-bg/80 rounded-full w-6 h-6 mx-auto flex items-center justify-center">
              <span className="font-serif text-gold text-sm">{values.top}</span>
            </div>
          </div>
          
          {/* Middle Row with Left/Right Values */}
          <div className="flex justify-between items-center flex-1">
            <div className="bg-dark-bg/80 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="font-serif text-gold text-sm">{values.left}</span>
            </div>
            
            {/* Card Name */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-serif text-gold/20 text-xs text-center px-1">
                {name}
              </span>
            </div>
            
            <div className="bg-dark-bg/80 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="font-serif text-gold text-sm">{values.right}</span>
            </div>
          </div>
          
          {/* Bottom Value */}
          <div className="text-center">
            <div className="bg-dark-bg/80 rounded-full w-6 h-6 mx-auto flex items-center justify-center">
              <span className="font-serif text-gold text-sm">{values.bottom}</span>
            </div>
          </div>
        </div>

        {/* Element Indicator (if any) */}
        {element && (
          <div className="absolute top-1 right-1">
            <div className="w-3 h-3 rounded-full bg-gold/30" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GameCard;
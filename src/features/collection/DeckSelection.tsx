import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Crown, Shield } from 'lucide-react';

interface DeckSelectionProps {
  decks: DeckType[];
  onSelectDeck: (deck: DeckType) => void;
  onCreateDeck: () => void;
  maxDecks: number;
}

const DeckSelection: React.FC<DeckSelectionProps> = ({
  decks,
  onSelectDeck,
  onCreateDeck,
  maxDecks
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {decks.map((deck) => (
        <motion.div
          key={deck.id}
          whileHover={{ scale: 1.02 }}
          className="bg-dark-gray/50 rounded-xl p-6 border border-medium-gray/30
                     hover:border-gold transition-colors duration-200 cursor-pointer"
          onClick={() => onSelectDeck(deck)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gold font-serif text-xl">{deck.name}</h3>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-medium-gray" />
              <span className="text-off-white">{deck.cards.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-off-white">{deck.powerRating}</span>
          </div>

          {/* Card Preview */}
          <div className="relative h-24 overflow-hidden">
            {deck.cards.slice(0, 3).map((card, index) => (
              <div
                key={card.id}
                className="absolute"
                style={{
                  left: `${index * 20}%`,
                  transform: `rotate(${(index - 1) * 15}deg)`,
                  zIndex: index
                }}
              >
                <div className="w-16 h-24 bg-dark-bg border border-medium-gray/30 rounded-lg" />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Create New Deck Button */}
      {decks.length < maxDecks && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="bg-dark-gray/30 rounded-xl p-6 border-2 border-dashed border-medium-gray/30
                     hover:border-gold transition-colors duration-200 flex flex-col items-center
                     justify-center gap-4 h-full"
          onClick={onCreateDeck}
        >
          <Plus className="w-8 h-8 text-gold" />
          <span className="text-gold font-serif">Create New Deck</span>
        </motion.button>
      )}
    </div>
  );
};

export default DeckSelection;
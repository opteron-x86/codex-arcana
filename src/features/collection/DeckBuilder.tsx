import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Save, Trash, Plus, AlertCircle } from 'lucide-react';
import GameCard from '../../components/game/GameCard';

interface DeckBuilderProps {
  playerCards: CardType[];
  selectedDeck: DeckType | null;
  onSaveDeck: (deck: DeckType) => void;
}

// Types
interface CardType {
  id: string;
  name: string;
  values: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  element?: string;
  tier: string;
  powerRating: number;
}

interface DeckType {
  id: string;
  name: string;
  cards: CardType[];
  powerRating: number;
}

const DeckBuilder: React.FC<DeckBuilderProps> = ({
  playerCards,
  selectedDeck,
  onSaveDeck,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [deck, setDeck] = useState<CardType[]>(selectedDeck?.cards || []);
  const [deckName, setDeckName] = useState(selectedDeck?.name || 'New Deck');

  // Constants
  const DECK_CONSTRAINTS = {
    minCards: 5,
    maxCards: 8,
    maxPowerRating: 1000
  };

  // Filter cards based on search and filters
  const filteredCards = useMemo(() => {
    return playerCards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesElement = !selectedElement || card.element === selectedElement;
      const matchesTier = !selectedTier || card.tier === selectedTier;
      return matchesSearch && matchesElement && matchesTier;
    });
  }, [playerCards, searchTerm, selectedElement, selectedTier]);

  // Calculate deck power rating
  const deckPowerRating = useMemo(() => {
    return deck.reduce((total, card) => total + card.powerRating, 0);
  }, [deck]);

  // Validate deck
  const deckValidation = useMemo(() => {
    const errors: string[] = [];
    
    if (deck.length < DECK_CONSTRAINTS.minCards) {
      errors.push(`Minimum ${DECK_CONSTRAINTS.minCards} cards required`);
    }
    if (deck.length > DECK_CONSTRAINTS.maxCards) {
      errors.push(`Maximum ${DECK_CONSTRAINTS.maxCards} cards allowed`);
    }
    if (deckPowerRating > DECK_CONSTRAINTS.maxPowerRating) {
      errors.push('Deck power rating exceeds maximum');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [deck, deckPowerRating]);

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Card Collection */}
        <div className="lg:col-span-2 bg-dark-gray/50 rounded-xl p-6 border border-medium-gray/30">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-medium-gray/30
                          rounded-lg text-off-white focus:outline-none focus:border-gold
                          transition-colors duration-200"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-4">
              <select
                value={selectedElement || ''}
                onChange={(e) => setSelectedElement(e.target.value || null)}
                className="bg-dark-bg border border-medium-gray/30 rounded-lg px-4 py-2
                          text-off-white focus:outline-none focus:border-gold"
              >
                <option value="">All Elements</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
              </select>

              <select
                value={selectedTier || ''}
                onChange={(e) => setSelectedTier(e.target.value || null)}
                className="bg-dark-bg border border-medium-gray/30 rounded-lg px-4 py-2
                          text-off-white focus:outline-none focus:border-gold"
              >
                <option value="">All Tiers</option>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>
            </div>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredCards.map(card => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setDeck(prev => [...prev, card])}
              >
                <GameCard
                  {...card}
                  isPlayable={deck.length < DECK_CONSTRAINTS.maxCards}
                  owner="player"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Deck Building */}
        <div className="bg-dark-gray/50 rounded-xl p-6 border border-medium-gray/30">
          {/* Deck Name */}
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="w-full px-4 py-2 bg-dark-bg border border-medium-gray/30
                      rounded-lg text-gold font-serif focus:outline-none focus:border-gold
                      mb-4"
          />

          {/* Deck Stats */}
          <div className="mb-4 p-4 bg-dark-bg rounded-lg border border-medium-gray/30">
            <div className="flex justify-between text-off-white mb-2">
              <span>Cards:</span>
              <span className={deck.length > DECK_CONSTRAINTS.maxCards ? 'text-ember' : 'text-gold'}>
                {deck.length} / {DECK_CONSTRAINTS.maxCards}
              </span>
            </div>
            <div className="flex justify-between text-off-white">
              <span>Power Rating:</span>
              <span className={deckPowerRating > DECK_CONSTRAINTS.maxPowerRating ? 'text-ember' : 'text-gold'}>
                {deckPowerRating}
              </span>
            </div>
          </div>

          {/* Validation Errors */}
          {!deckValidation.isValid && (
            <div className="mb-4 p-4 bg-ember/10 rounded-lg border border-ember/30">
              {deckValidation.errors.map((error, index) => (
                <div key={index} className="flex items-center gap-2 text-ember">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Deck Cards */}
          <div className="space-y-2">
            {deck.map((card, index) => (
              <motion.div
                key={`${card.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative group"
              >
                <GameCard {...card} owner="player" />
                <button
                  onClick={() => setDeck(prev => prev.filter((_, i) => i !== index))}
                  className="absolute -right-2 -top-2 bg-ember hover:bg-gold
                            rounded-full p-1 opacity-0 group-hover:opacity-100
                            transition-opacity duration-200"
                >
                  <Trash size={16} className="text-dark-bg" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Save Button */}
          <button
            onClick={() => onSaveDeck({ id: selectedDeck?.id || 'new', name: deckName, cards: deck, powerRating: deckPowerRating })}
            disabled={!deckValidation.isValid}
            className="w-full mt-6 px-4 py-2 bg-gold hover:bg-ember disabled:bg-medium-gray
                      text-dark-bg rounded-lg font-serif transition-colors duration-200"
          >
            Save Deck
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckBuilder;
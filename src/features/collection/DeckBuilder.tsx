import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search,  Save, Trash,  AlertCircle, ChevronLeft } from 'lucide-react';
import GameCard from '../../components/game/GameCard';
import type { DeckBuilderProps, CardType, DeckType, DeckValidation } from '../../types/game';
import { validateDeck, calculateDeckPowerRating } from '../../types/game';

const DECK_CONSTRAINTS = {
  minCards: 5,
  maxCards: 8,
  maxPowerRating: 1000,
  maxCopiesPerCard: 2,
  allowedElements: ['fire', 'water', 'earth', 'wind', 'holy', 'dark'],
  allowedTiers: ['common', 'rare', 'epic', 'legendary']
};

const DeckBuilder: React.FC<DeckBuilderProps> = ({
  playerCards,
  selectedDeck,
  onSaveDeck,
  onCancel
}) => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [deck, setDeck] = useState<CardType[]>(selectedDeck?.cards || []);
  const [deckName, setDeckName] = useState(selectedDeck?.name || 'New Deck');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized values
  const filteredCards = useMemo(() => {
    return playerCards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesElement = !selectedElement || card.element === selectedElement;
      const matchesTier = !selectedTier || card.tier === selectedTier;
      return matchesSearch && matchesElement && matchesTier;
    });
  }, [playerCards, searchTerm, selectedElement, selectedTier]);

  const deckPowerRating = useMemo(() => calculateDeckPowerRating(deck), [deck]);

  const deckValidation = useMemo<DeckValidation>(() => {
    return validateDeck(
      { id: selectedDeck?.id || 'new', name: deckName, cards: deck, powerRating: deckPowerRating },
      DECK_CONSTRAINTS
    );
  }, [deck, deckName, deckPowerRating, selectedDeck?.id]);

  // Handlers
  const handleAddCard = useCallback((card: CardType) => {
    const cardCount = deck.filter(c => c.id === card.id).length;
    if (cardCount < DECK_CONSTRAINTS.maxCopiesPerCard && deck.length < DECK_CONSTRAINTS.maxCards) {
      setDeck(prev => [...prev, card]);
    }
  }, [deck]);

  const handleRemoveCard = useCallback((index: number) => {
    setDeck(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSave = async () => {
    if (!deckValidation.isValid) return;

    setIsSubmitting(true);
    try {
      await onSaveDeck({
        id: selectedDeck?.id || 'new',
        name: deckName,
        cards: deck,
        powerRating: deckPowerRating
      });
    } catch (error) {
      console.error('Failed to save deck:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Header */}
        <div className="lg:col-span-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onCancel}
              className="text-gold hover:text-ember transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <h1 className="text-3xl font-serif text-gold">
              {selectedDeck ? 'Edit Deck' : 'Create Deck'}
            </h1>
          </div>
        </div>

        {/* Left Column - Card Collection */}
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-dark-gray/50 rounded-xl p-6 border border-medium-gray/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Search Bar */}
            <div className="relative mb-4">
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

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
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
                <option value="wind">Wind</option>
                <option value="holy">Holy</option>
                <option value="dark">Dark</option>
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

            {/* Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredCards.map((card) => {
                  const cardCount = deck.filter(c => c.id === card.id).length;
                  const canAddCard = cardCount < DECK_CONSTRAINTS.maxCopiesPerCard && 
                                   deck.length < DECK_CONSTRAINTS.maxCards;

                  return (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={canAddCard ? { scale: 1.05, y: -5 } : {}}
                      className="relative"
                    >
                      <div onClick={() => canAddCard && handleAddCard(card)}>
                        <GameCard
                          {...card}
                          isPlayable={canAddCard}
                          owner="player"
                        />
                      </div>
                      {cardCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-gold text-dark-bg rounded-full 
                                   w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                        >
                          {cardCount}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Current Deck */}
        <motion.div 
          className="bg-dark-gray/50 rounded-xl p-6 border border-medium-gray/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Deck Name Input */}
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="w-full px-4 py-2 bg-dark-bg border border-medium-gray/30
                      rounded-lg text-gold font-serif focus:outline-none focus:border-gold
                      mb-4"
            placeholder="Enter deck name..."
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
                {deckPowerRating} / {DECK_CONSTRAINTS.maxPowerRating}
              </span>
            </div>
          </div>

          {/* Validation Messages */}
          <AnimatePresence>
            {(!deckValidation.isValid || deckValidation.warnings.length > 0) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 space-y-2"
              >
                {deckValidation.errors.map((error, index) => (
                  <div 
                    key={`error-${index}`} 
                    className="flex items-center gap-2 text-ember bg-ember/10 
                             rounded-lg px-3 py-2 border border-ember/30"
                  >
                    <AlertCircle size={16} />
                    <span className="text-sm">{error}</span>
                  </div>
                ))}
                {deckValidation.warnings.map((warning, index) => (
                  <div 
                    key={`warning-${index}`} 
                    className="flex items-center gap-2 text-gold bg-gold/10 
                             rounded-lg px-3 py-2 border border-gold/30"
                  >
                    <AlertCircle size={16} />
                    <span className="text-sm">{warning}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected Cards */}
          <div className="space-y-2 mb-6">
            <AnimatePresence>
              {deck.map((card, index) => (
                <motion.div
                  key={`${card.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative group"
                >
                  <GameCard {...card} owner="player" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveCard(index)}
                    className="absolute -right-2 -top-2 bg-ember hover:bg-gold
                              rounded-full p-1 opacity-0 group-hover:opacity-100
                              transition-opacity duration-200"
                  >
                    <Trash size={16} className="text-dark-bg" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Save Button */}
          <motion.button
            onClick={handleSave}
            disabled={!deckValidation.isValid || isSubmitting}
            className="w-full px-4 py-2 bg-gold hover:bg-ember disabled:bg-medium-gray
                      text-dark-bg rounded-lg font-serif transition-colors duration-200
                      flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save size={20} />
            {isSubmitting ? 'Saving...' : 'Save Deck'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DeckBuilder;

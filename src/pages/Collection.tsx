import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import DeckBuilder from '../features/collection/DeckBuilder';
import DeckSelection from '../features/collection/DeckSelection';
import { motion } from 'framer-motion';
import { Book, Plus } from 'lucide-react';
import { usePlayerCollection } from '../features/collection/hooks/usePlayerCollection';

interface DeckType {
  id: string;
  name: string;
  cards: CardType[];
  powerRating: number;
}

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

const CollectionPage = () => {
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const { user } = useAuth();
  const { 
    cards, 
    decks, 
    loading, 
    error, 
    saveDeck 
  } = usePlayerCollection(user?.id);

  const handleSaveDeck = async (deck: DeckType) => {
    try {
      await saveDeck(deck);
      setIsBuilding(false);
      // Could add a success notification here
    } catch (err) {
      console.error('Failed to save deck:', err);
      // Could add error handling UI here
    }
  };

  const handleCreateDeck = () => {
    const newDeck: DeckType = {
      id: 'new',
      name: 'New Deck',
      cards: [],
      powerRating: 0
    };
    setSelectedDeck(newDeck);
    setIsBuilding(true);
  };

  const handleSelectDeck = (deck: DeckType) => {
    setSelectedDeck(deck);
    setIsBuilding(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gold font-serif text-xl"
        >
          Loading Collection...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-ember font-serif text-xl">
          Failed to load collection: {error.message}
        </div>
      </div>
    );
  }

  if (isBuilding) {
    return (
      <DeckBuilder
        playerCards={cards}
        selectedDeck={selectedDeck}
        onSaveDeck={handleSaveDeck}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <Book className="w-8 h-8 text-gold" />
            <h1 className="text-3xl font-serif text-gold">Card Collection</h1>
          </div>
          <motion.button
            onClick={handleCreateDeck}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-ember
                     text-dark-bg rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            New Deck
          </motion.button>
        </motion.div>

        {/* Collection Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-dark-gray/50 rounded-lg p-4 border border-medium-gray/30">
            <h3 className="text-gold font-serif mb-2">Total Cards</h3>
            <p className="text-2xl text-off-white">{cards.length}</p>
          </div>
          <div className="bg-dark-gray/50 rounded-lg p-4 border border-medium-gray/30">
            <h3 className="text-gold font-serif mb-2">Decks</h3>
            <p className="text-2xl text-off-white">{decks.length}</p>
          </div>
          <div className="bg-dark-gray/50 rounded-lg p-4 border border-medium-gray/30">
            <h3 className="text-gold font-serif mb-2">Collection Power</h3>
            <p className="text-2xl text-off-white">
              {cards.reduce((total, card) => total + card.powerRating, 0)}
            </p>
          </div>
        </motion.div>

        {/* Deck Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DeckSelection
            decks={decks}
            onSelectDeck={handleSelectDeck}
            onCreateDeck={handleCreateDeck}
            maxDecks={5}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionPage;
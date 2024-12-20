import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import DeckBuilder from '../features/collection/DeckBuilder';
import DeckSelection from '../features/collection/DeckSelection';
import { motion } from 'framer-motion';
import { Book, Plus } from 'lucide-react';
import { usePlayerCollection } from '../features/collection/hooks/usePlayerCollection';

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
  } = usePlayerCollection(user.id);


  // This will be replaced with actual data from Amplify
  const mockDecks = [
    {
      id: '1',
      name: 'First Deck',
      cards: [], // Will be populated from database
      powerRating: 750
    }
  ];

  const mockCards = [
    {
      id: '1',
      name: 'Dragon Knight',
      values: { top: 8, right: 6, bottom: 7, left: 5 },
      element: 'fire',
      tier: 'rare',
      powerRating: 150
    },
    // Add more mock cards
  ];

  const handleSaveDeck = (deck: DeckType) => {
    // Will implement Amplify save logic
    console.log('Saving deck:', deck);
    setIsBuilding(false);
  };

  const handleCreateDeck = () => {
    setSelectedDeck(null);
    setIsBuilding(true);
  };

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    setIsBuilding(true);
  };

  if (isBuilding) {
    return (
      <DeckBuilder
        playerCards={mockCards}
        selectedDeck={selectedDeck}
        onSaveDeck={handleSaveDeck}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Book className="w-8 h-8 text-gold" />
            <h1 className="text-3xl font-serif text-gold">Card Collection</h1>
          </div>
          <button
            onClick={handleCreateDeck}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-ember
                     text-dark-bg rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            New Deck
          </button>
        </div>

        {/* Deck Selection */}
        <DeckSelection
          decks={mockDecks}
          onSelectDeck={handleSelectDeck}
          onCreateDeck={handleCreateDeck}
          maxDecks={5} // This could be based on player's unlocked slots
        />
      </div>
    </div>
  );
};

export default CollectionPage;
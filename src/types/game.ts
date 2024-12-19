// types/game.ts
export interface CardValues {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
  
  export interface CardType {
    id: string;
    name: string;
    values: CardValues;
    element?: 'fire' | 'water' | 'earth' | 'wind' | 'holy' | 'dark';
    tier: 'common' | 'rare' | 'epic' | 'legendary';
    powerRating: number;
    image?: string;
  }
  
  export interface DeckType {
    id: string;
    name: string;
    cards: CardType[];
    powerRating: number;
  }
  
  export interface DeckConstraints {
    minCards: number;
    maxCards: number;
    maxPowerRating: number;
    maxCopiesPerCard: number;
    allowedElements: string[];
    allowedTiers: string[];
  }
  
  export interface DeckValidation {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }
  
  export interface DeckBuilderProps {
    playerCards: CardType[];
    selectedDeck: DeckType | null;
    onSaveDeck: (deck: DeckType) => Promise<void>;
    onCancel?: () => void;
  }
  
  // Utility function to calculate deck power rating
  export const calculateDeckPowerRating = (cards: CardType[]): number => {
    return cards.reduce((total, card) => total + card.powerRating, 0);
  };
  
  // Utility function to validate deck
  export const validateDeck = (
    deck: DeckType,
    constraints: DeckConstraints
  ): DeckValidation => {
    const errors: string[] = [];
    const warnings: string[] = [];
  
    // Check minimum cards
    if (deck.cards.length < constraints.minCards) {
      errors.push(`Minimum ${constraints.minCards} cards required`);
    }
  
    // Check maximum cards
    if (deck.cards.length > constraints.maxCards) {
      errors.push(`Maximum ${constraints.maxCards} cards allowed`);
    }
  
    // Check power rating
    const powerRating = calculateDeckPowerRating(deck.cards);
    if (powerRating > constraints.maxPowerRating) {
      errors.push(`Deck power rating (${powerRating}) exceeds maximum (${constraints.maxPowerRating})`);
    }
  
    // Check card copies
    const cardCounts = deck.cards.reduce((counts, card) => {
      counts[card.id] = (counts[card.id] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  
    Object.entries(cardCounts).forEach(([cardId, count]) => {
      if (count > constraints.maxCopiesPerCard) {
        errors.push(`Maximum ${constraints.maxCopiesPerCard} copies of each card allowed`);
      }
    });
  
    // Element distribution warning
    const elementCounts = deck.cards.reduce((counts, card) => {
      if (card.element) {
        counts[card.element] = (counts[card.element] || 0) + 1;
      }
      return counts;
    }, {} as Record<string, number>);
  
    if (Object.keys(elementCounts).length < 2 && deck.cards.length >= 3) {
      warnings.push('Consider including cards of different elements for better synergy');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  };
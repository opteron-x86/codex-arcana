export interface DeckType {
    id: string;
    name: string;
    cards: CardType[];
    powerRating: number;
  }
  
  export interface CardType {
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
  
  export interface BoardPosition {
    card: CardType | null;
    isValid: boolean;
  }
// types/schema.ts
export const config = {
  databaseType: 'POSTGRESQL',
  ...rdsConfig
};

export interface Player {
  id: string;
  username: string;
  email: string;
  rank: number;
  souls: number;
  winCount: number;
  lossCount: number;
  cards: PlayerCard[];
  decks: Deck[];
  cosmetics: PlayerCosmetic[];
  matches: Match[];
}

export interface Card {
  id: string;
  name: string;
  values: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  element?: string;
  rarity: string;
  image?: string;
  playerCards: PlayerCard[];
}

export interface PlayerCard {
  id: string;
  playerId: string;
  cardId: string;
  player: Player;
  card: Card;
  quantity: number;
  isInDeck: boolean;
}

export interface Deck {
  id: string;
  playerId: string;
  name: string;
  player: Player;
  cards: DeckCard[];
}

export interface DeckCard {
  id: string;
  deckId: string;
  playerCardId: string;
  deck: Deck;
  playerCard: PlayerCard;
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  player1: Player;
  player2: Player;
  winnerId?: string;
  moves: Move[];
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  gameState: any; // Define specific game state type
  startTime: string;
  endTime?: string;
}

export interface Move {
  id: string;
  matchId: string;
  match: Match;
  playerId: string;
  player: Player;
  cardId: string;
  position: {
    row: number;
    col: number;
  };
  captures: string[];
  timestamp: string;
}

export interface Cosmetic {
  id: string;
  name: string;
  type: 'CARD_BACK' | 'BOARD_DESIGN' | 'EFFECT';
  image?: string;
  price: number;
  playerCosmetics: PlayerCosmetic[];
}

export interface PlayerCosmetic {
  id: string;
  playerId: string;
  cosmeticId: string;
  player: Player;
  cosmetic: Cosmetic;
  isEquipped: boolean;
}
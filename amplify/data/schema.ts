// amplify/data/schema.ts
export const schema = {
    Player: {
      id: 'ID!',
      username: 'String!',
      email: 'String!',
      rank: 'Int',
      souls: 'Int', // in-game currency
      winCount: 'Int',
      lossCount: 'Int',
      cards: ['@hasMany(indexName: "byPlayer", fields: ["id"])', 'PlayerCard'],
      decks: ['@hasMany(indexName: "byPlayer", fields: ["id"])', 'Deck'],
      cosmetics: ['@hasMany(indexName: "byPlayer", fields: ["id"])', 'PlayerCosmetic'],
      matches: ['@hasMany(indexName: "byPlayer", fields: ["id"])', 'Match'],
    },
  
    Card: {
      id: 'ID!',
      name: 'String!',
      values: 'AWSJSON!', // { top: number, right: number, bottom: number, left: number }
      element: 'String',
      rarity: 'String!',
      image: 'String',
      playerCards: ['@hasMany(indexName: "byCard", fields: ["id"])', 'PlayerCard'],
    },
  
    PlayerCard: {
      id: 'ID!',
      playerId: 'ID!',
      cardId: 'ID!',
      player: ['@belongsTo(fields: ["playerId"])', 'Player'],
      card: ['@belongsTo(fields: ["cardId"])', 'Card'],
      quantity: 'Int!',
      isInDeck: 'Boolean',
    },
  
    Deck: {
      id: 'ID!',
      playerId: 'ID!',
      name: 'String!',
      player: ['@belongsTo(fields: ["playerId"])', 'Player'],
      cards: ['@hasMany(indexName: "byDeck", fields: ["id"])', 'DeckCard'],
    },
  
    DeckCard: {
      id: 'ID!',
      deckId: 'ID!',
      playerCardId: 'ID!',
      deck: ['@belongsTo(fields: ["deckId"])', 'Deck'],
      playerCard: ['@belongsTo(fields: ["playerCardId"])', 'PlayerCard'],
    },
  
    Match: {
      id: 'ID!',
      player1Id: 'ID!',
      player2Id: 'ID!',
      player1: ['@belongsTo(fields: ["player1Id"])', 'Player'],
      player2: ['@belongsTo(fields: ["player2Id"])', 'Player'],
      winnerId: 'ID',
      moves: ['@hasMany(indexName: "byMatch", fields: ["id"])', 'Move'],
      status: 'String!', // ACTIVE, COMPLETED, ABANDONED
      gameState: 'AWSJSON!', // Current board state
      startTime: 'AWSDateTime!',
      endTime: 'AWSDateTime',
    },
  
    Move: {
      id: 'ID!',
      matchId: 'ID!',
      match: ['@belongsTo(fields: ["matchId"])', 'Match'],
      playerId: 'ID!',
      player: ['@belongsTo(fields: ["playerId"])', 'Player'],
      cardId: 'ID!',
      position: 'AWSJSON!', // { row: number, col: number }
      captures: '[ID]', // Array of captured card IDs
      timestamp: 'AWSDateTime!',
    },
  
    Cosmetic: {
      id: 'ID!',
      name: 'String!',
      type: 'String!', // CARD_BACK, BOARD_DESIGN, EFFECT
      image: 'String',
      price: 'Int!',
      playerCosmetics: ['@hasMany(indexName: "byCosmetic", fields: ["id"])', 'PlayerCosmetic'],
    },
  
    PlayerCosmetic: {
      id: 'ID!',
      playerId: 'ID!',
      cosmeticId: 'ID!',
      player: ['@belongsTo(fields: ["playerId"])', 'Player'],
      cosmetic: ['@belongsTo(fields: ["cosmeticId"])', 'Cosmetic'],
      isEquipped: 'Boolean!',
    }
  };
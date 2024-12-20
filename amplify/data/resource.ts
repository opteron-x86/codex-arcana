import { a, defineSchema } from '@aws-amplify/backend';

const schema = defineSchema({
  Player: a.model({
    fields: {
      id: a.id(),
      username: a.string().required(),
      email: a.string().required(),
      rank: a.integer(),
      souls: a.integer(),
      winCount: a.integer(),
      lossCount: a.integer(),
      cards: a.hasMany('PlayerCard', { relationName: 'PlayerCards' }),
      decks: a.hasMany('Deck', { relationName: 'PlayerDecks' }),
      cosmetics: a.hasMany('PlayerCosmetic', { relationName: 'PlayerCosmetics' }),
      matches: a.hasMany('Match', { relationName: 'PlayerMatches' })
    }
  }),

  Card: a.model({
    fields: {
      id: a.id(),
      name: a.string().required(),
      values: a.json().required(),
      element: a.string(),
      rarity: a.string().required(),
      image: a.string(),
      playerCards: a.hasMany('PlayerCard', { relationName: 'CardPlayers' })
    }
  }),

  PlayerCard: a.model({
    fields: {
      id: a.id(),
      playerId: a.string().required(),
      cardId: a.string().required(),
      quantity: a.integer().required(),
      isInDeck: a.boolean(),
      player: a.belongsTo('Player', { relationName: 'PlayerCards' }),
      card: a.belongsTo('Card', { relationName: 'CardPlayers' })
    }
  }),

  Deck: a.model({
    fields: {
      id: a.id(),
      playerId: a.string().required(),
      name: a.string().required(),
      cards: a.hasMany('DeckCard', { relationName: 'DeckCards' }),
      player: a.belongsTo('Player', { relationName: 'PlayerDecks' })
    }
  }),

  DeckCard: a.model({
    fields: {
      id: a.id(),
      deckId: a.string().required(),
      playerCardId: a.string().required(),
      deck: a.belongsTo('Deck', { relationName: 'DeckCards' }),
      playerCard: a.belongsTo('PlayerCard', { relationName: 'CardDecks' })
    }
  })
});

export { schema };

// Database configuration
export const config = {
  databaseType: 'POSTGRESQL',
  replicas: 1,
  schema: 'public'
} as const;
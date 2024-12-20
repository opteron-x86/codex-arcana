import { type ClientSchema, a } from '@aws-amplify/data-schema';

export const schema = {
  Player: a.model({
    id: a.id(),
    username: a.string().required(),
    email: a.string().required(),
    rank: a.number(),
    souls: a.number(),
    winCount: a.number(),
    lossCount: a.number(),
    cards: a.hasMany('PlayerCard'),
    decks: a.hasMany('Deck'),
    cosmetics: a.hasMany('PlayerCosmetic'),
    matches: a.hasMany('Match')
  }),

  Card: a.model({
    id: a.id(),
    name: a.string().required(),
    values: a.json().required(),
    element: a.string(),
    rarity: a.string().required(),
    image: a.string(),
    playerCards: a.hasMany('PlayerCard')
  }),

  PlayerCard: a.model({
    id: a.id(),
    playerId: a.string().required(),
    cardId: a.string().required(),
    quantity: a.number().required(),
    isInDeck: a.boolean(),
    player: a.belongsTo('Player'),
    card: a.belongsTo('Card')
  }),

  Deck: a.model({
    id: a.id(),
    playerId: a.string().required(),
    name: a.string().required(),
    cards: a.hasMany('DeckCard'),
    player: a.belongsTo('Player')
  }),

  DeckCard: a.model({
    id: a.id(),
    deckId: a.string().required(),
    playerCardId: a.string().required(),
    deck: a.belongsTo('Deck'),
    playerCard: a.belongsTo('PlayerCard')
  })
} satisfies ClientSchema<typeof schema>;

// Database configuration
export const config = {
  databaseType: 'POSTGRESQL',
  replicas: 1,
  schema: 'public'
} as const;
// amplify/data/resource.ts
import { a } from '@aws-amplify/backend';

export const schema = {
  Player: a.model({
    fields: {
      userId: a.string().required(),
      username: a.string().required(),
      email: a.string().required()
    },
    authorization: {
      rules: [
        a.allow.owner().to(['read', 'update']),
        a.allow.public().to(['read'])
      ]
    }
  }),

  Card: a.model({
    fields: {
      cardId: a.string().required(),
      name: a.string().required(),
      power: a.integer().required()
    },
    authorization: {
      rules: [
        a.allow.public().to(['read'])
      ]
    }
  })
};
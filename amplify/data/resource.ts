// amplify/data/resource.ts
import { a, defineSchema } from '@aws-amplify/backend';

const schema = defineSchema({
  Player: a.model({
    fields: {
      id: a.id(),
      username: a.string().required(),
      email: a.string().required()
    }
  }),

  Card: a.model({
    fields: {
      id: a.id(),
      name: a.string().required(),
      power: a.integer().required()
    }
  })
});

export { schema };
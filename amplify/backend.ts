// amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import { schema } from './data/resource';
import { auth } from './auth/resource';

export const backend = defineBackend({
  auth,
  schema
});
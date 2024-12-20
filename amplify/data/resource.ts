import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// Aurora PostgreSQL configuration
export const rdsConfig = {
  engine: 'postgres',
  engineVersion: '13.7',
  instanceType: 'serverless-v2',
  minCapacity: 0.5,  // ACUs (Aurora Capacity Units)
  maxCapacity: 8,    // ACUs
  autoPause: true,   // Pause when no activity
  maxIdle: 1800,     // Pause after 30 minutes of inactivity
  storageEncrypted: true,
  enablePerformanceInsights: true,
  deletionProtection: true, // Prevent accidental deletion
  backupRetentionPeriod: 7  // Days to retain backups
};

// Define configuration
export const config = {
  databaseType: 'POSTGRESQL',
  replicas: 1,       // Number of read replicas
  schema: 'public',  // PostgreSQL schema name
  ...rdsConfig
};

// Export your schema
export const schema = {
  // Your schema definition will go here
  // We'll define this in the next step
} satisfies ClientSchema;

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

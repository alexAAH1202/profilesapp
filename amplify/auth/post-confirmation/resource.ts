import { defineFunction } from '@aws-amplify/backend';
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { defineAuth } from '@aws-amplify/backend-auth';
import { postConfirmation } from './post-confirmation/resource';

// Define the postConfirmation function
export const postConfirmation = defineFunction({
  name: 'post-confirmation',
});

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    postConfirmation
  }
});

// Define the schema and authorization logic
const schema = a
  .schema({
    UserProfile: a
      .model({
        email: a.string(),
        profileOwner: a.string(),
      })
      .authorization((allow) => [
        allow.ownerDefinedIn("profileOwner"),
      ]),
  })
  .authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

// Define the data model with authorization modes
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

import { defineFunction } from '@aws-amplify/backend';
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { defineAuth } from '@aws-amplify/backend-auth';
import { Schema } from '@aws-amplify/graphql-api-construct';

// Define the postConfirmation function
export const postConfirmation = defineFunction({
  name: 'post-confirmation',
  // Add any necessary configuration here
});

export const auth = defineAuth({
  loginWith: {
    email: true,
    // Add any other login methods you want to support
  },
  triggers: {
    postConfirmation
  }
});

// Define your data schema
export const schema = a.schema({
  UserProfile: a.model({
    email: a.string(),
    profileOwner: a.string(),
    // Add other fields as needed
  })
});

// Define your data
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});

// Define your API
export const api = new Schema({
  schema: schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});

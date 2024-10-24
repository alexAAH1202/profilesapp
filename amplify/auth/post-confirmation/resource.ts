import { defineFunction } from '@aws-amplify/backend';
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { defineAuth } from '@aws-amplify/backend-auth';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { APIGraphQLConfig } from '@aws-amplify/api-graphql';

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
const schema = a.schema({
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

// Configure Amplify
const apiConfig: APIGraphQLConfig = {
  endpoint: process.env.API_PROFILESAPP_GRAPHQLAPIENDPOINTOUTPUT || '',
  region: process.env.AWS_REGION,
  defaultAuthMode: 'userPool',
};

Amplify.configure({
  API: {
    GraphQL: apiConfig,
  },
});

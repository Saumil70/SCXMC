// lib/apolloClient.ts
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import config from 'temp/config';

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || config.graphQLEndpoint;

const authHeader = config.sitecoreApiKey
  ? { Authorization: `Bearer ${config.sitecoreApiKey}` }
  : undefined;

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlEndpoint,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;

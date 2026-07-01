// lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http';

const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  (process.env.SITECORE_EDGE_URL
    ? `${process.env.SITECORE_EDGE_URL}/v1/content/api/graphql/v1`
    : 'https://edge-platform.sitecorecloud.io/v1/content/api/graphql/v1');

const graphqlApiKey = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY || process.env.SITECORE_API_KEY;

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
  fetchOptions: {
    cache: 'no-store',
  },
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    ...(graphqlApiKey ? { Authorization: `Bearer ${graphqlApiKey}` } : {}),
  },
}));

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

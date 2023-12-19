import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const { API_HOSTNAME, GRAPHQL_API_PORT } = Constants.manifest.extra;

const httpLink = createHttpLink({
  uri: `http://${API_HOSTNAME}:${GRAPHQL_API_PORT}/graphql`,
});

const defaultOptions = {
  watchQuery: { fetchPolicy: 'cache-and-network' },
};

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions,
  });
};

export default createApolloClient;

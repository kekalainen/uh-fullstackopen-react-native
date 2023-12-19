import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const { GRAPHQL_API_URI } = Constants.manifest.extra;

const httpLink = createHttpLink({
  uri: GRAPHQL_API_URI,
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

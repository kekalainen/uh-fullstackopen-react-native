import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';
import Constants from 'expo-constants';

const { GRAPHQL_API_URI } = Constants.manifest.extra;

const httpLink = createHttpLink({
  uri: GRAPHQL_API_URI,
});

const defaultOptions = {
  watchQuery: { fetchPolicy: 'cache-and-network' },
};

const cache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_operation, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (error) {
      console.error(error);

      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    defaultOptions,
  });
};

export default createApolloClient;

import { useApolloClient, useMutation } from '@apollo/client';

import useAuthStorage from './useAuthStorage';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    await authStorage.setAccessToken(result.data?.authenticate?.accessToken);

    await apolloClient.resetStore();

    return result;
  };

  return { signIn, result };
};

export default useSignIn;

import { useMutation } from '@apollo/client';

import useAuthStorage from './useAuthStorage';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
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

    return result;
  };

  return { signIn, result };
};

export default useSignIn;

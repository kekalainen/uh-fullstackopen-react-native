import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();

    await apolloClient.resetStore();

    navigate('/');
  };

  return { signOut };
};

export default useSignOut;

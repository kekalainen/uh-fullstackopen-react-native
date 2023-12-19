import { useEffect } from 'react';

import { Text } from './common';
import useSignOut from '../hooks/useSignOut';

const SignIn = () => {
  const { signOut } = useSignOut();

  useEffect(() => {
    signOut();
  }, []);

  return <Text>Signing out...</Text>;
};

export default SignIn;

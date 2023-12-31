import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { Button, Card, FormikTextInput } from './common';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('A username is required.'),
  password: yup.string().required('A password is required.'),
});

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

const SignInForm = ({ onSubmit }) => (
  <>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    <Button onPress={onSubmit}>Sign in</Button>
  </>
);

export const SignInContainer = ({ onSubmit }) => (
  <View style={styles.container}>
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </Card>
  </View>
);

const SignIn = () => {
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signIn({ username, password });

      if (data?.authenticate?.accessToken) navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;

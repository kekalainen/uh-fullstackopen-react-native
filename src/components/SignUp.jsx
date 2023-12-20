import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { Button, Card, FormikTextInput } from './common';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('A username is required.')
    .min(5, 'The username must be at least 5 characters long.')
    .max(30, 'The username cannot exceed 30 characters in length.'),
  password: yup
    .string()
    .required('A password is required.')
    .min(5, 'The password must be at least 5 characters long.')
    .max(30, 'The password cannot exceed 30 characters in length.'),
  passwordConfirmation: yup
    .string()
    .required('The password confirmation is required.')
    .oneOf([yup.ref('password')], 'The given passwords do not match.'),
});

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

const SignUpForm = ({ onSubmit }) => (
  <>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    <FormikTextInput
      name="passwordConfirmation"
      placeholder="Password confirmation"
      secureTextEntry
    />
    <Button onPress={onSubmit}>Sign up</Button>
  </>
);

export const SignUpContainer = ({ onSubmit }) => (
  <View style={styles.container}>
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </Card>
  </View>
);

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      if (!data?.createUser?.id)
        throw new Error('User creation failed (ID missing).');

      await signIn({ username, password });

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

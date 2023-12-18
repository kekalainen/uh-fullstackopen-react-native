import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';

import { Button, Card, FormikTextInput } from './common';

const initialValues = {
  username: '',
  password: '',
};

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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Card>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
      </Card>
    </View>
  );
};

export default SignIn;

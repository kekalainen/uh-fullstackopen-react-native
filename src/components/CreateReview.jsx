import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { Button, Card, FormikTextInput } from './common';
import { CREATE_REVIEW } from '../graphql/mutations';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('The repository owner username is required.'),
  repositoryName: yup.string().required('The repository name is required.'),
  rating: yup
    .number()
    .required('A rating is required.')
    .typeError('The rating must be numeric.')
    .min(0, 'The rating cannot be negative.')
    .max(100, 'The rating can be at most 100.'),
  text: yup.string().optional(),
});

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

const CreateReviewForm = ({ onSubmit }) => (
  <>
    <FormikTextInput name="ownerName" placeholder="Repository owner username" />
    <FormikTextInput name="repositoryName" placeholder="Repository name" />
    <FormikTextInput
      name="rating"
      placeholder="Rating (between 0 and 100)"
      keyboardType="number-pad"
    />
    <FormikTextInput name="text" placeholder="Review" multiline />
    <Button onPress={onSubmit}>Submit your review</Button>
  </>
);

export const CreateReviewContainer = ({ onSubmit }) => (
  <View style={styles.container}>
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </Card>
  </View>
);

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: parseInt(rating),
            text,
          },
        },
      });

      if (data?.createReview?.repository?.id)
        navigate(`/repositories/${data.createReview.repository.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;

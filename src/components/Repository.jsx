import { useQuery } from '@apollo/client';
import { StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

const Repository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, { variables: { id } });

  if (!data?.repository) return null;

  return (
    <View style={styles.container}>
      <RepositoryItem {...data.repository} externalLink />
    </View>
  );
};

export default Repository;

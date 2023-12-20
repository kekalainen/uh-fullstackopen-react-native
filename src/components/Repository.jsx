import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import { Card, Text } from './common';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';

const reviewRatingDimension = 40;

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    margin: 10,
  },
  listHeader: {
    marginBottom: 20,
  },
  separator: {
    height: 10,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  reviewRating: {
    display: 'flex',
    width: reviewRatingDimension,
    height: reviewRatingDimension,
    marginEnd: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 2,
    borderRadius: reviewRatingDimension / 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
  },
  reviewAuthor: {
    marginBottom: 10,
  },
});

const ReviewItem = ({ createdAt, rating, text, user }) => (
  <Card style={styles.reviewContainer}>
    <View>
      <Text subheading bold style={styles.reviewRating}>
        {rating}
      </Text>
    </View>
    <View style={{ flexShrink: 1 }}>
      <View style={styles.reviewAuthor}>
        <Text bold>{user.username}</Text>
        <Text secondary>{new Date(createdAt).toLocaleDateString()}</Text>
      </View>
      <Text>{text}</Text>
    </View>
  </Card>
);

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, { variables: { id } });

  if (!data?.repository) return null;

  const { repository } = data;

  return (
    <View style={styles.container}>
      <FlatList
        data={repository.reviews.edges.map(({ node }) => node)}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ReviewItem {...item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <RepositoryItem {...repository} externalLink />
          </View>
        }
      />
    </View>
  );
};

export default Repository;

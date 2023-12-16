import { Text, View } from 'react-native';

const RepositoryItem = ({
  description,
  forksCount,
  fullName,
  language,
  ratingAverage,
  reviewCount,
  stargazersCount,
}) => (
  <View>
    <Text>Full name: {fullName}</Text>
    <Text>Description: {description}</Text>
    <Text>Language: {language}</Text>
    <Text>Stars: {stargazersCount}</Text>
    <Text>Forks: {forksCount}</Text>
    <Text>Reviews: {reviewCount}</Text>
    <Text>Rating: {ratingAverage}</Text>
  </View>
);

export default RepositoryItem;

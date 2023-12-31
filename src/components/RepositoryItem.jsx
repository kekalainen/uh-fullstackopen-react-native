import { Image, Linking, StyleSheet, View } from 'react-native';

import { Badge, Button, Card, Stat, Text } from './common';
import { formatNumber } from '../utils';
import theme from '../theme';

const repositoryUrlBase = 'https://github.com';

const avatarDimension = 48;

const styles = StyleSheet.create({
  overview: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  overviewText: {
    marginBottom: 5,
  },
  avatar: {
    width: avatarDimension,
    height: avatarDimension,
    marginEnd: 15,
    borderRadius: theme.borderRadius,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  externalLink: {
    marginTop: 20,
  },
});

const RepositoryItem = ({
  description,
  forksCount,
  fullName,
  language,
  ownerAvatarUrl,
  ratingAverage,
  reviewCount,
  stargazersCount,
  externalLink,
}) => (
  <Card testID="repository-item">
    <View style={styles.overview}>
      <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
      <View style={{ flexShrink: 1 }}>
        <Text subheading bold style={styles.overviewText}>
          {fullName}
        </Text>
        <Text secondary style={styles.overviewText}>
          {description}
        </Text>
        <Badge>{language}</Badge>
      </View>
    </View>
    <View style={styles.stats}>
      <Stat title="Stars" value={formatNumber(stargazersCount)} />
      <Stat title="Forks" value={formatNumber(forksCount)} />
      <Stat title="Reviews" value={formatNumber(reviewCount)} />
      <Stat title="Rating" value={ratingAverage} />
    </View>
    {externalLink && (
      <Button
        onPress={() => Linking.openURL(`${repositoryUrlBase}/${fullName}`)}
        style={styles.externalLink}
      >
        Open in GitHub
      </Button>
    )}
  </Card>
);

export default RepositoryItem;

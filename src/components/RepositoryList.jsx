import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const orderingOptions = {
  latest: {
    label: 'Lastest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highestRated: {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowestRated: {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  listHeader: {
    marginBottom: 10,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ ordering, setOrdering }) => (
  <View style={styles.listHeader}>
    <Picker selectedValue={ordering} onValueChange={setOrdering}>
      {Object.keys(orderingOptions).map((key) => (
        <Picker.Item
          key={key}
          label={orderingOptions[key].label}
          value={key}
        ></Picker.Item>
      ))}
    </Picker>
  </View>
);

export const RepositoryListContainer = ({
  repositories,
  onPress,
  ordering,
  setOrdering,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryListHeader ordering={ordering} setOrdering={setOrdering} />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onPress(item)}>
          <RepositoryItem {...item} />
        </Pressable>
      )}
      style={styles.container}
    />
  );
};

const RepositoryList = () => {
  const [ordering, setOrdering] = useState(Object.keys(orderingOptions)[0]);
  const { repositories } = useRepositories(orderingOptions[ordering]);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={(item) => navigate(`/repositories/${item.id}`)}
      ordering={ordering}
      setOrdering={setOrdering}
    />
  );
};

export default RepositoryList;

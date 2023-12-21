import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import { Card, TextInput } from './common';
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
  searchCard: {
    marginBottom: 10,
    padding: 0,
  },
  searchInput: {
    marginBottom: 0,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ ordering, setOrdering, setSearchKeyword }) => (
  <View style={styles.listHeader}>
    <Card style={styles.searchCard}>
      <TextInput
        onChange={({ nativeEvent: { text } }) => setSearchKeyword(text)}
        placeholder="Search"
        inputMode="search"
        returnKeyType="search"
        style={styles.searchInput}
      />
    </Card>
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
  setSearchKeyword,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryListHeader
          ordering={ordering}
          setOrdering={setOrdering}
          setSearchKeyword={setSearchKeyword}
        />
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
  const [searchKeyword, setSearchKeyword] = useState('');
  const { repositories } = useRepositories({
    ...orderingOptions[ordering],
    searchKeyword,
  });
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={(item) => navigate(`/repositories/${item.id}`)}
      ordering={ordering}
      setOrdering={setOrdering}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;

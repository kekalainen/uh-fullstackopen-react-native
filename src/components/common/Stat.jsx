import { StyleSheet, View } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  value: {
    marginBottom: 2,
  },
});

const Stat = ({ title, value }) => (
  <View style={styles.container}>
    <Text bold style={styles.value}>
      {value}
    </Text>
    <Text secondary>{title}</Text>
  </View>
);

export default Stat;

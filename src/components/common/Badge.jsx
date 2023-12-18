import { StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../../theme';
import { View } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.primaryLight,
  },
  text: {
    marginHorizontal: 6,
    marginVertical: 2,
  },
});

const Badge = ({ children }) => (
  <Text>
    <View style={styles.wrapper}>
      <Text light style={styles.text}>
        {children}
      </Text>
    </View>
  </Text>
);

export default Badge;

import { StyleSheet, View } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: theme.colors.primaryLight,
    shadowOpacity: 0.1,
    elevation: 3,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.card,
  },
});

const Card = ({ children, ...props }) => (
  <View style={styles.container} {...props}>
    {children}
  </View>
);

export default Card;

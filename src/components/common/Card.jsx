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

const Card = ({ children }) => <View style={styles.container}>{children}</View>;

export default Card;

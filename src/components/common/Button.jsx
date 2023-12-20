import { Pressable, StyleSheet, View } from 'react-native';

import Text from './Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.primary,
  },
  text: {
    padding: 15,
    textAlign: 'center',
  },
});

const Button = ({ onPress, children, style }) => (
  <View style={[styles.wrapper, style]}>
    <Pressable
      onPress={onPress}
      android_ripple={{ color: theme.colors.darken }}
    >
      <Text bold light style={styles.text}>
        {children}
      </Text>
    </Pressable>
  </View>
);

export default Button;

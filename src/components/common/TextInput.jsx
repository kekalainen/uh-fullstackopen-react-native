import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  formField: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.primaryLightest,
    borderRadius: theme.borderRadius,
  },
  formFieldInvalid: {
    marginBottom: 0,
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.formField,
    error && styles.formFieldInvalid,
    style,
  ];

  return (
    <NativeTextInput
      style={textInputStyle}
      placeholderTextColor={theme.colors.primaryLighter}
      {...props}
    />
  );
};

export default TextInput;

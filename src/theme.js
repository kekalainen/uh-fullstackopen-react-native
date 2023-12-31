import { Platform } from 'react-native';

const theme = {
  colors: {
    primary: '#37474F',
    primaryDark: '#263238',
    primaryLight: '#455A64',
    primaryLighter: '#90A4AE',
    primaryLightest: '#ECEFF1',
    error: '#D84315',
    textPrimary: '#24292E',
    textSecondary: '#586069',
    textLight: '#FFF',
    card: '#FFF',
    darken: 'rgba(0, 0, 0, 0.3)',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  borderRadius: 8,
};

export default theme;

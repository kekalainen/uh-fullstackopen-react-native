import 'dotenv/config';

const { API_HOSTNAME, GRAPHQL_API_PORT, REST_API_PORT } = process.env;

export default {
  name: 'uh-fullstackopen-react-native',
  slug: 'uh-fullstackopen-react-native',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    API_HOSTNAME,
    GRAPHQL_API_PORT,
    REST_API_PORT,
  },
};

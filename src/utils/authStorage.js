import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_ACCESS_TOKEN = 'access-token';

const constructKey = (namespace, key) => `${namespace}:${key}`;

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    return AsyncStorage.getItem(constructKey(this.namespace, KEY_ACCESS_TOKEN));
  }

  setAccessToken(accessToken) {
    return AsyncStorage.setItem(
      constructKey(this.namespace, KEY_ACCESS_TOKEN),
      accessToken
    );
  }

  removeAccessToken() {
    return AsyncStorage.removeItem(
      constructKey(this.namespace, KEY_ACCESS_TOKEN)
    );
  }
}

export default AuthStorage;

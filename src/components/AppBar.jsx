import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import { Text } from './common';
import { GET_ME } from '../graphql/queries';
import theme from '../theme';

const tabs = [
  {
    title: 'Repositories',
    path: '/',
  },
  {
    title: 'Sign in',
    path: '/signin',
    authState: false,
  },
  {
    title: 'Sign out',
    path: '/signout',
    authState: true,
  },
];

const topRibbonHeight = Constants.statusBarHeight;

const paddingVertical = 20;
const paddingHorizontal = 10;

const styles = StyleSheet.create({
  topRibbon: {
    zIndex: 1,
    elevation: 1,
    marginBottom: -topRibbonHeight,
    paddingTop: topRibbonHeight,
    backgroundColor: theme.colors.darken,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: topRibbonHeight,
    backgroundColor: theme.colors.primary,
  },
  tab: {
    paddingVertical,
    paddingHorizontal,
  },
});

const AppBarTab = ({ tab, isActive, setActive }) => (
  <Pressable
    onPress={() => setActive()}
    style={styles.tab}
    android_ripple={{ color: theme.colors.darken }}
  >
    <Text subheading light bold={isActive}>
      {tab.title}
    </Text>
  </Pressable>
);

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const [activeTab, setActiveTab] = useState(tabs[0].title);
  const navigate = useNavigate();

  const isAuthenticated = typeof data?.me?.id === 'string';

  const enabledTabs = tabs.filter(({ authState }) => {
    return typeof authState === 'undefined' || authState === isAuthenticated;
  });

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.topRibbon} />
      <View style={styles.container}>
        <ScrollView horizontal>
          {enabledTabs.map((tab) => (
            <AppBarTab
              key={tab.title}
              tab={tab}
              isActive={activeTab === tab.title}
              setActive={() => {
                setActiveTab(tab.title);
                navigate(tab.path);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default AppBar;

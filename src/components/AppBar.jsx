import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import { Text } from './common';
import theme from '../theme';

const tabs = [
  {
    title: 'Repositories',
  },
  {
    title: 'Placeholder',
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
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.topRibbon} />
      <View style={styles.container}>
        {tabs.map((tab) => (
          <AppBarTab
            key={tab.title}
            tab={tab}
            isActive={activeTab === tab.title}
            setActive={() => setActiveTab(tab.title)}
          />
        ))}
      </View>
    </>
  );
};

export default AppBar;

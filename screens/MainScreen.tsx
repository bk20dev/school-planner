import { View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteIcon } from '../components/RouteIcon';
import Placeholder from './Placeholder';
import { Appbar } from 'react-native-paper';
import { Route } from '@react-navigation/native';
import TimeTable from './TimeTable';

const Tab = createBottomTabNavigator();

const options: BottomTabNavigationOptions = {
  headerTitleContainerStyle: { paddingLeft: 8 },
  headerRightContainerStyle: { paddingRight: 8 },
  headerStyle: { elevation: 0 },
  tabBarActiveTintColor: 'rgba(0,0,0,1)',
  tabBarInactiveTintColor: 'rgba(0,0,0,.4)',
  headerRight: () => (
    <Appbar.Action icon="dots-vertical" color="black" onPress={() => {}} />
  ),
  tabBarStyle: {
    height: 76,
    paddingTop: 16,
    paddingBottom: 16,
    elevation: 0,
    borderTopWidth: 0,
  },
  tabBarIconStyle: {
    margin: 8,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
};

const getIcon = (route: Route<string>, active: boolean) => (
  <View style={{ opacity: active ? 1 : 0.4 }}>
    <RouteIcon route={route.name} />
  </View>
);

export const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getIcon(route, focused),
        ...options,
      })}>
      <Tab.Screen name={'Dashboard'} component={Placeholder} />
      <Tab.Screen name={'Homework'} component={Placeholder} />
      <Tab.Screen name={'Exams'} component={Placeholder} />
      <Tab.Screen name={'Schedule'} component={TimeTable} />
    </Tab.Navigator>
  );
};

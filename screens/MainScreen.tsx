import { View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteIcon } from '../components/RouteIcon';
import Placeholder from './Placeholder';
import { Appbar } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ opacity: focused ? 1 : 0.4 }}>
              <RouteIcon route={route.name} />
            </View>
          );
        },
        tabBarActiveTintColor: 'rgba(0,0,0,1)',
        tabBarInactiveTintColor: 'rgba(0,0,0,.4)',
        headerRight: () => {
          return (
            <Appbar.Action
              icon="dots-vertical"
              color="black"
              onPress={() => {}}
            />
          );
        },
      })}>
      <Tab.Screen name={'Dashboard'} component={Placeholder} />
      <Tab.Screen name={'Homework'} component={Placeholder} />
      <Tab.Screen name={'Exams'} component={Placeholder} />
      <Tab.Screen name={'Schedule'} component={Placeholder} />
    </Tab.Navigator>
  );
};

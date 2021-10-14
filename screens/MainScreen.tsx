import {View} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteIcon } from '../components/RouteIcon';
import Placeholder from "./Placeholder";

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
      })}>
      <Tab.Screen name={'Dashboard'} component={Placeholder} />
      <Tab.Screen name={'Homework'} component={Placeholder} />
      <Tab.Screen name={'Exams'} component={Placeholder} />
      <Tab.Screen name={'Schedule'} component={Placeholder} />
    </Tab.Navigator>
  );
};

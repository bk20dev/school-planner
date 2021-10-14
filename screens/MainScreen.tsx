import {Text, View} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteIcon } from '../components/RouteIcon';

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
      <Tab.Screen name={'Dashboard'} component={() => <Text>Dashboard</Text>} />
      <Tab.Screen name={'Homework'} component={() => <Text>Homework</Text>} />
      <Tab.Screen name={'Exams'} component={() => <Text>Exams</Text>} />
      <Tab.Screen name={'Schedule'} component={() => <Text>Schedule</Text>} />
    </Tab.Navigator>
  );
};

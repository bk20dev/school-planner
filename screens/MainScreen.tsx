import { Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'Calendar'} component={() => <Text>Calendar</Text>} />
      <Tab.Screen name={'Homework'} component={() => <Text>Homework</Text>} />
      <Tab.Screen name={'Exams'} component={() => <Text>Exams</Text>} />
    </Tab.Navigator>
  );
};

import { RouteProp } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import AppTheme from './constants/AppTheme';
import { Routes } from './constants/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddEventScreen } from './screens/AddEventScreen';
import { AddSubjectScreen } from './screens/AddSubjectScreen';
import { MainScreen } from './screens/MainScreen';
import { DatabaseLoader } from './storage/DatabaseContext';
import { store } from './store';
import { Event } from './types/Event';
import { SubjectDetails } from './screens/SubjectDetails';
import { RemoveSubjectScreen } from './screens/RemoveSubjectScreen';

export type RootStackParamList = {
  SubjectDetails: {
    event: Event;
  };
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <ReduxProvider store={store}>
      <DatabaseLoader>
        <PaperProvider>
          <NavigationContainer theme={AppTheme}>
            <Stack.Navigator
              initialRouteName={Routes.Main}
              screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
              }}>
              <Stack.Screen
                name={Routes.SubjectDetails}
                component={SubjectDetails}
                options={{
                  title: 'Event details',
                  headerShown: true,
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen name={Routes.Main} component={MainScreen} />
              <Stack.Screen
                name={Routes.AddSubject}
                component={AddSubjectScreen}
                options={{ title: 'Add subject' }}
              />
              <Stack.Screen
                name={Routes.RemoveSubject}
                component={RemoveSubjectScreen}
                options={{
                  title: 'Remove subject',
                  headerShown: true,
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                name={Routes.AddEvent}
                options={{ title: 'Add new event' }}
                component={AddEventScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </DatabaseLoader>
    </ReduxProvider>
  );
};

export default App;

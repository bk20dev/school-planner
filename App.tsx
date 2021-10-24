import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainScreen } from './screens/MainScreen';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { Provider as PaperProvider } from 'react-native-paper';
import { DatabaseLoader } from './storage/DatabaseContext';
import AppTheme from './constants/AppTheme';
import { AddEventScreen } from './screens/AddEventScreen';
import { Routes } from './constants/Routes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <DatabaseLoader>
        <PaperProvider>
          <NavigationContainer theme={AppTheme}>
            <Stack.Navigator
              initialRouteName={Routes.Main}
              screenOptions={{ headerShown: false, headerShadowVisible: false }}>
              <Stack.Screen name={Routes.Main} component={MainScreen} />
              <Stack.Screen name={Routes.AddEvent} options={{title: "Add new event"}} component={AddEventScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </DatabaseLoader>
    </ReduxProvider>
  );
}


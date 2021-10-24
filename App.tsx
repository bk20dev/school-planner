import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { MainScreen } from './screens/MainScreen';
import Placeholder from './screens/Placeholder';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { Provider as PaperProvider } from 'react-native-paper';
import { DatabaseLoader } from './storage/DatabaseContext';

const Stack = createNativeStackNavigator();

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <DatabaseLoader>
        <PaperProvider>
          <NavigationContainer theme={AppTheme}>
            <Stack.Navigator
              initialRouteName="Main"
              screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="Settings" component={Placeholder} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </DatabaseLoader>
    </ReduxProvider>
  );
}

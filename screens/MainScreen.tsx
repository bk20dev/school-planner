import { Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import React from "react";

type MainScreenProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const MainScreen = () => {
  const navigator = useNavigation<MainScreenProp>();

  return (
    <Button
      title="Open settings"
      onPress={() => navigator.navigate('Settings')}
    />
  );
};

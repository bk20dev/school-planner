import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'hoist-non-react-statics/node_modules/@types/react';
import { ScreenRouteProp } from '../App';
import { Routes } from '../constants/Routes';

interface Props {
  route: ScreenRouteProp<Routes.SubjectDetails>;
}

export const AddSubjectScreen: FC<Props> = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(route);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
    });
  });

  return (
    <View style={styles.container}>
      <Text>dupa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  wrapper: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'rgba(253, 152, 0, .16)',
    borderRadius: 32,
  },
});

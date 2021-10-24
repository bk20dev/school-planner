import React, { FC, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenRouteProp } from '../App';
import { Routes } from '../constants/Routes';
import { DatabaseContext } from '../storage/DatabaseContext';
import { useDispatch } from 'react-redux';
import { remove } from '../store/eventsSlice';
import { Button } from 'react-native-paper';
import AppTheme from '../constants/AppTheme';

interface SubjectDetailsProps {
  route: ScreenRouteProp<Routes.SubjectDetails>;
}

export const SubjectDetails: FC<SubjectDetailsProps> = ({ route }) => {
  const navigation = useNavigation();
  const database = useContext(DatabaseContext);
  const dispatch = useDispatch();

  const { event } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
    });
  });

  const handleDelete = () => {
    database.instance.transaction(tx => {
      tx.executeSql('DELETE FROM events WHERE id = ?', [event.id]);
    });

    dispatch(remove(event.id));

    // @ts-ignore
    navigation.navigate(Routes.Dashboard);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Subject: </Text>
        <Text style={styles.description}>{event.subject}</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.row}>
        <Text style={styles.title}>Description: </Text>
        <Text style={styles.description}>{event.title}</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.row}>
        <Text style={styles.title}>Type: </Text>
        <Text style={styles.description}>{event.type}</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <Button style={styles.button} theme={AppTheme} onPress={handleDelete}>
        Usuń
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
  container: {
    padding: 24,
  },
  button: {
    backgroundColor: 'rgba(253, 152, 0, .16)',
    borderRadius: 32,
  },
  spacer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    flexGrow: 1,
    height: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
  },
});

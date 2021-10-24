import { useDispatch } from 'react-redux';
import React, { useContext, useState } from 'react';
import { DatabaseContext } from '../storage/DatabaseContext';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AppTheme from '../constants/AppTheme';
import { useNavigation } from '@react-navigation/native';
import { add } from '../store/subjectsSlice';

export const AddSubjectScreen = () => {
  const dispatch = useDispatch();
  const database = useContext(DatabaseContext);

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerRight: () => (
        <Button onPress={handleSubmit} theme={AppTheme} style={styles.button}>
          Add
        </Button>
      ),
    });
  });

  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (subject.length > 0 && subject.length <= 18) {
      database.instance.transaction(tx => {
        tx.executeSql('INSERT INTO subjects (name) VALUES (?)', [subject]);

        tx.executeSql(
          'SELECT id, name FROM subjects ORDER BY id DESC LIMIT 1',
          [],
          (_, result) => {
            dispatch(add(result.rows.item(0)));
          },
        );

        // @ts-ignore
        navigation.navigate('Dashboard');
      });
    } else if (!subject) {
      setError('You need to enter the name!');
    } else {
      setError('The name is too long!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#FD9800', fontSize: 12 }}>{error}</Text>
      <View style={styles.wrapper}>
        <TextInput
          label="Name"
          theme={AppTheme}
          mode="outlined"
          value={subject}
          onChangeText={setSubject}
        />
      </View>
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

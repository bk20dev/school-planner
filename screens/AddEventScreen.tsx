import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useState } from 'react';
import { DatabaseContext } from '../storage/DatabaseContext';
import { EventType } from '../types/Event';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyledDropDown } from '../components/StyledDropDown';
import { Button, TextInput } from 'react-native-paper';
import AppTheme from '../constants/AppTheme';
import { StyledDatePicker } from '../components/StyledDatePicker';
import { useNavigation } from '@react-navigation/native';
import { add } from '../store/eventsSlice';
import { RootState } from '../store';

const types: { label: string; value: EventType }[] = [
  { label: 'Homework', value: EventType.Homework },
  { label: 'Exam', value: EventType.Exam },
];

const getBaseDate = (date: Date) => {
  const day = 86400000;
  const base = Math.floor(date.getTime() / day) * day;
  return new Date(base);
};

export const AddEventScreen = () => {
  const dispatch = useDispatch();
  const database = useContext(DatabaseContext);

  const subjects: { value: string; label: string }[] = useSelector(
    (state: RootState) => state.subjectsSlice,
  ).map(subject => ({ value: subject.name, label: subject.name }));

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Button onPress={handleSubmit} theme={AppTheme} style={styles.button}>
          Add
        </Button>
      ),
    });
  });

  const [subject, setSubject] = useState<number | string>(subjects[0]?.value);
  const [type, setType] = useState<EventType>(EventType.Exam);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (subject && description) {
      database.instance.transaction(tx => {
        tx.executeSql(
          'INSERT INTO events (date, type, title, subject) VALUES (?, ?, ?, ?)',
          [getBaseDate(date).toISOString(), type, description, subject],
        );

        tx.executeSql(
          'SELECT * FROM events ORDER BY id DESC LIMIT 1',
          [],
          (_, result) => {
            dispatch(add(result.rows.item(0)));
          },
        );

        // @ts-ignore
        navigation.navigate('Dashboard');
      });
    } else {
      setError(
        'You need to fill in all fields! You can add a new subject in 3 dot menu :)',
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ color: '#FD9800', fontSize: 12 }}>{error}</Text>
      <View style={styles.wrapper}>
        <StyledDropDown
          label="Subject"
          list={subjects}
          value={subject}
          setValue={setSubject}
        />
      </View>
      <View style={styles.wrapper}>
        <StyledDropDown
          label="Type"
          list={types}
          value={type}
          setValue={setType}
        />
      </View>
      <View style={styles.wrapper}>
        <StyledDatePicker value={date} setDate={setDate} />
      </View>
      <View style={styles.wrapper}>
        <TextInput
          label="Description"
          theme={AppTheme}
          mode="outlined"
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </ScrollView>
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

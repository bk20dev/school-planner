import { useDispatch } from 'react-redux';
import React, { useContext, useState } from 'react';
import { DatabaseContext } from '../storage/DatabaseContext';
import { EventType } from '../types/Event';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StyledDropDown } from '../components/StyledDropDown';
import { Button, TextInput } from 'react-native-paper';
import AppTheme from '../constants/AppTheme';
import { StyledDatePicker } from '../components/StyledDatePicker';
import { useNavigation } from '@react-navigation/native';
import { add } from '../store/eventsSlice';

const subjects: { label: string; value: string }[] = [
  { label: 'Maths', value: 'maths' },
  { label: 'English', value: 'english' },
  { label: 'IT', value: 'it' },
  { label: 'PE', value: 'pe' },
  { label: 'Chemistry', value: 'chemistry' },
];

const types: { label: string; value: EventType }[] = [
  { label: 'Homework', value: EventType.Homework },
  { label: 'Exam', value: EventType.Exam },
];

export const AddEventScreen = () => {
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

  const [subject, setSubject] = useState(subjects[0].value);
  const [type, setType] = useState<EventType>(EventType.Exam);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    database.instance.transaction(tx => {
      const date = new Date().toISOString();

      tx.executeSql(
        'INSERT INTO events (date, type, title, subjectId) VALUES (?, ?, ?, ?)',
        [date, type, description, 1],
      );

      tx.executeSql(
        'SELECT events.id, events.date, events.title, events.type, subjects.subject FROM events INNER JOIN subjects ON subjects.id = events.subjectId ORDER BY events.id DESC LIMIT 1',
        [],
        (_, result) => dispatch(add(result.rows.item(0))),
      );

      // @ts-ignore
      navigation.navigate('Dashboard');
    });
  };

  return (
    <ScrollView style={styles.container}>
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

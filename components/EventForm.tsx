import React, { useState, useContext } from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { DatabaseContext } from '../storage/DatabaseContext';
import { add } from '../store/eventsSlice';
import { EventType } from '../types/Event';
import StyledDropDown from './StyledDropDown';
import StyledTextInput from './StyledTextInput';

const EventForm = () => {
  const dispatch = useDispatch();
  const database = useContext(DatabaseContext);

  const [title, setTitle] = useState('');
  const [type, setType] = useState<EventType>(EventType.Exam);
  const [subject, setSubject] = useState('');

  const submit = () => {
    database.instance.transaction(tx => {
      const date = new Date().toISOString();

      tx.executeSql(
        'INSERT INTO events (date, type, title, subjectId) VALUES (?, ?, ?, ?)',
        [date, type, title, 1],
      );

      tx.executeSql(
        'SELECT events.id, events.date, events.title, events.type, subjects.subject FROM events INNER JOIN subjects ON subjects.id = events.subjectId ORDER BY events.id DESC LIMIT 1',
        [],
        (_, result) => dispatch(add(result.rows.item(0))),
      );
    });
  };

  return (
    <View>
      <StyledDropDown
        label="Przedmiot"
        list={[{ label: 'matematyka', value: 1 }]}
        value={subject}
        setValue={setSubject}
      />
      <StyledDropDown
        label="Typ"
        list={[
          { label: 'zadanie', value: 'homework' },
          { label: 'test', value: 'exam' },
        ]}
        value={type}
        setValue={setType}
      />
      <StyledTextInput label="Opis" value={title} onChangeText={setTitle} />
      <Button title="create" onPress={submit} />
    </View>
  );
};

export default EventForm;

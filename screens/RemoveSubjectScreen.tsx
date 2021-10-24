import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { StyledDropDown } from '../components/StyledDropDown';
import { Button } from 'react-native-paper';
import AppTheme from '../constants/AppTheme';
import { DatabaseContext } from '../storage/DatabaseContext';
import { remove } from '../store/subjectsSlice';

export const RemoveSubjectScreen = () => {
  const database = useContext(DatabaseContext);
  const dispatch = useDispatch();

  const subjects = useSelector((state: RootState) => state.subjectsSlice).map(
    subject => ({
      label: subject.name,
      value: subject.id,
    }),
  );

  const [selectedSubject, setSelectedSubject] = useState<number | undefined>(
    subjects[0]?.value,
  );

  const handleDelete = () => {
    if (selectedSubject) {
      database.instance.transaction(tx => {
        tx.executeSql('DELETE FROM subjects WHERE id = ?', [selectedSubject]);
      });

      dispatch(remove(selectedSubject));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StyledDropDown
        label="Subject"
        list={subjects}
        value={selectedSubject}
        setValue={setSelectedSubject}
      />
      <Button style={styles.button} theme={AppTheme} onPress={handleDelete}>
        Delete
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

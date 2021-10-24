import React, { createContext, FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { set as setEvents } from '../store/eventsSlice';
import { set as setSubjects } from '../store/subjectsSlice';
import { Event } from '../types/Event';
import { Subject } from '../types/Subject';
import { DatabaseManager } from './DatabaseManager';

export const DatabaseContext = createContext<DatabaseManager>(
  new DatabaseManager(),
);

export const DatabaseLoader: FC = ({ children }) => {
  const database = useContext(DatabaseContext);
  const dispatch = useDispatch();

  useEffect(() => {
    database.instance.transaction(tx => {
      tx.executeSql('SELECT * FROM subjects', [], (_, result) => {
        const subjects = (result.rows as unknown as { _array: Subject[] })
          ._array;
        console.log(subjects);
        dispatch(setSubjects(subjects));
      });

      tx.executeSql(
        'SELECT events.id, events.date, events.title, events.type, subjects.name FROM events INNER JOIN subjects ON subjects.id = events.subjectId',
        [],
        (_, result) => {
          const events = (result.rows as unknown as { _array: Event[] })._array;
          console.log(events);
          dispatch(setEvents(events));
        },
      );
    });
  });

  return <>{children}</>;
};

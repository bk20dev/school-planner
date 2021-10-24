import React, { createContext, FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { set } from '../store/eventsSlice';
import { Event } from '../types/Event';
import { DatabaseManager } from './DatabaseManager';

export const DatabaseContext = createContext<DatabaseManager>(
  new DatabaseManager(),
);

export const DatabaseLoader: FC = ({ children }) => {
  const database = useContext(DatabaseContext);
  const dispatch = useDispatch();

  useEffect(() => {
    database.instance.transaction(tx => {
      const query =
        'SELECT events.id, events.date, events.title, events.type, subjects.subject FROM events INNER JOIN subjects ON subjects.id = events.subjectId';

      tx.executeSql(query, [], (_, result) => {
        const rows = (result.rows as unknown as { _array: Event[] })._array;
        dispatch(set(rows));
      });
    });
  });

  return <>{children}</>;
};

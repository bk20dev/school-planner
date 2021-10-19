import React, { createContext, FC, useEffect, useState } from 'react';
import * as SQlLite from 'expo-sqlite';

export const DatabaseContext = createContext<SQlLite.Database | undefined>(
  undefined,
);

const DatabaseContextWrapper: FC = ({ children }) => {
  const [database, setDatabase] = useState<SQlLite.Database | undefined>(
    undefined,
  );

  const connect = () => {
    const database = SQlLite.openDatabase('data');
    setDatabase(database);
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContextWrapper;

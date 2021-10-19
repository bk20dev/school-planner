import React, { FC, useContext, useEffect } from 'react';
import { DatabaseContext } from './DatabaseContext';

const DatabaseConfig: FC = ({ children }) => {
  const databaseContext = useContext(DatabaseContext);

  useEffect(() => {
    const sql = `
      CREATE TABLE IF NOT EXISTS USER (
        id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(40)
      );
    `;

    databaseContext?.transaction(tx => tx.executeSql(sql));
  }, []);

  return <>{children}</>;
};

export default DatabaseConfig;

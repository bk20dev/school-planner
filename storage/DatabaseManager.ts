import { openDatabase, WebSQLDatabase } from 'expo-sqlite';

export class DatabaseManager {
  readonly instance: WebSQLDatabase;

  constructor() {
    this.instance = openDatabase('data');
    this.initialize();
  }

  private initialize() {
    const queries = [
      'CREATE TABLE IF NOT EXISTS subjects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)',
      'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, type TEXT NOT NULL,  title TEXT NOT NULL, subjectId INTEGER NOT NULL, FOREIGN KEY (subjectId) REFERENCES subjects(id))',
    ];

    this.instance.transaction(tx => {
      queries.forEach(query => tx.executeSql(query));
    });
  }
}

export enum EventType {
  Exam = 'exam',
  Homework = 'homework',
}

export interface Event {
  id: number;
  date: string;
  type: EventType;
  subject: string;
  title: string;
}

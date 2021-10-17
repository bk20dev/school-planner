export enum EventType {
  Exam = 'exam',
  Homework = 'homework',
}

export interface Event {
  date: Date,
  type: EventType;
  subject: string;
  title?: string;
  details?: string;
}

import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';
import subjectsSlice from './subjectsSlice';

export const store = configureStore({
  reducer: {
    eventsSlice,
    subjectsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

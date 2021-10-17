import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';

export const store = configureStore({
  reducer: {
    eventsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

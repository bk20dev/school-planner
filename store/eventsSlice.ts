import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { Event } from '../types/Event';

const initialState: (Event & { id: string })[] = [];

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Event>) {
      state.push({
        id: uuid(),
        ...action.payload,
      });
    },
    remove(state, action: PayloadAction<string>) {
      state = state.filter(event => event.id !== action.payload);
    },
  },
});

export default eventsSlice.reducer;

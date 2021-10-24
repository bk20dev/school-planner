import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../types/Event';

const initialState: Event[] = [];

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    set(state, action: PayloadAction<Event[]>) {
      state.push(...action.payload);
    },
    add(state, action: PayloadAction<Event>) {
      state.push({ ...action.payload });
    },
    remove(state, action: PayloadAction<number>) {
      const id = state.findIndex(event => event.id === action.payload);
      state.splice(id, 1);
    },
  },
});

export const { set, add, remove } = eventsSlice.actions;
export default eventsSlice.reducer;

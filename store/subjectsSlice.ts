import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from '../types/Subject';

const initialState: Subject[] = [];

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    set(state, action: PayloadAction<Subject[]>) {
      state.push(...action.payload);
    },
    add(state, action: PayloadAction<Subject>) {
      state.push(action.payload);
    },
    remove(state, action: PayloadAction<number>) {
      state = state.filter(subject => subject.id !== action.payload);
    },
  },
});

export const { set, add, remove } = subjectsSlice.actions;
export default subjectsSlice.reducer;

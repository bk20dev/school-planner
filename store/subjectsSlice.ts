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
      const id = state.findIndex(subject => subject.id == action.payload);
      state.splice(id, 1);
    },
  },
});

export const { set, add, remove } = subjectsSlice.actions;
export default subjectsSlice.reducer;

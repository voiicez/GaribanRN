import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nightEvents: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addNightEvent: (state, action) => {
      state.nightEvents.push(action.payload);
    },
    clearNightEvents: state => {
      state.nightEvents = [];
    }
  }
});

export const { addNightEvent, clearNightEvents } = gameSlice.actions;
export default gameSlice.reducer;

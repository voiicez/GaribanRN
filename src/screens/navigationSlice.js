// navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    navigatedFromMarket: false,
  },
  reducers: {
    setNavigatedFromMarket: (state, action) => {
      state.navigatedFromMarket = action.payload;
    },
  },
});

export const { setNavigatedFromMarket } = navigationSlice.actions;
export default navigationSlice.reducer;

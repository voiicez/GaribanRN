// store.js
import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    game: gameReducer,
    // ... other reducers
  },
});

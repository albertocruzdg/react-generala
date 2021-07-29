import { configureStore } from '@reduxjs/toolkit';
import diceReducer from '../features/dice/diceSlice';

export default configureStore({
  reducer: {
    diceReducer: diceReducer,
  }
});
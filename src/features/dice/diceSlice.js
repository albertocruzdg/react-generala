import { createSlice } from "@reduxjs/toolkit";
import { initialState, initialDices } from "./initialState";

export const diceSlice = createSlice({
  name: 'dice',
  initialState: initialState,
  reducers: {
    dicesThrown: (state, action) => {
      if (!canThrowDice(state.availableRolls, state.dices)) {
        return state;
      }

      state.dices = action.payload;
      state.availableRolls -= 1;
    },
    blockToggled: (state, action) => {
      if (state.availableRolls === 3) {
        return state;
      }

      state.dices[action.payload].blocked = !state.dices[action.payload].blocked;
    },
    scratch: (state, action) => {
      let score = state.scoring.filter(x => x.combination == action.payload)[0]
      score.scratched = true;

      state.availableRolls = 3;
      state.dices = initialDices;
    },
    assignScore: (state, action) => {
      let score = state.scoring.filter(x => x.combination == action.payload.combination)[0];
      score.earned = action.payload.earned;

      state.availableRolls = 3;
      state.dices = initialDices;
    },
  }
});

const canThrowDice = (availableRolls, dices) => availableRolls !== 0 && Object.keys(dices).filter(x => dices[x].blocked).length !== 5;

export const { dicesThrown, blockToggled, assignScore, scratch } = diceSlice.actions;

export const canThrow = state => canThrowDice(state.diceReducer.availableRolls, state.diceReducer.dices);

export default diceSlice.reducer;
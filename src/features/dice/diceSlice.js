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

const getPossibleCombinations = state => {
  let possibleCombinations = [];

  let diceValues = Object
    .keys(state.dices)
    .map(index => state.dices[index].value);

  let calculators = combinationCalculators.filter(x => x.appliesFor(diceValues, state.scoring));

  for (const calculator of calculators) {
    let combination = calculator.calculate(diceValues);
    possibleCombinations.push(combination);
  }

  return possibleCombinations;
}

const generalaCalculator = new GeneralaCalculator();
const straightCalculator = new StraightCalculator();
const fullHouseCalculator = new TwoGroupCalculator(3, maxScores.FullHouse);
const fourOfAKindCalculator = new TwoGroupCalculator(4, maxScores.FourOfAKind);// TODO: [3,3,3,3,3] doesn't enter here and it should

const combinationCalculators = [
  new NumberedCalculator(1),
  new NumberedCalculator(2),
  new NumberedCalculator(3),
  new NumberedCalculator(4),
  new NumberedCalculator(5),
  new NumberedCalculator(6),
  new FirstRollBonusDecorator(straightCalculator),
  new FirstRollBonusDecorator(fullHouseCalculator),
  new FirstRollBonusDecorator(fourOfAKindCalculator),
  generalaCalculator,
  new DoubleGeneralaCalculator(generalaCalculator)
];

class NumberedCalculator {
  constructor(number) {
    this.number = number;
  }

  appliesFor(diceValues, scoring) {
    return diceValues.includes(this.number);
  }
  
  calculate(diceValues, availableRolls) {
    let matches = diceValues.filter(x => x === this.number).length;

    return matches * this.number;
  };
}

class StraightCalculator {
  appliesFor(diceValues, scoring) {
    let unique = [...new Set(diceValues)];
    return unique.length === 5;
  }

  calculate(diceValues, availableRolls) {
    return maxScores.Straight;
  }
}

class TwoGroupCalculator {
  constructor(biggestGroupSize, score) {
    this.biggestGroupSize = biggestGroupSize;
    this.smallestGroupSize = 5 - this.biggestGroupSize;
    this.score = score;
  }

  appliesFor(diceValues, scoring) {
    let counter = this.getCounter(diceValues);

    if (Object.keys(counter).length !== 2) {
      return false;
    }

    let [, firstCount] = Object.entries(counter)[0];

    return firstCount === this.biggestGroupSize || this.smallestGroupSize;
  }

  calculate(diceValues, availableRolls) {
    return this.score;
  }

  getCounter(diceValues) {
    let counter = {};

    diceValues.forEach(x => counter[x] = (counter[x] || 0 + 1));

    return counter;
  }
}

class GeneralaCalculator {
  appliesFor(diceValues, scoring) {
    let unique = [...Set(diceValues)];

    return unique.length === 1;
  }

  calculate(diceValues, availableRolls) {
    return maxScores.Generala;
  }
}

class DoubleGeneralaCalculator {
  constructor(generalaCalculator) {
    this.generalaCalculator = generalaCalculator;
  }

  appliesFor(diceValues, scoring) {
    return scoring.hasGenerala && this.generalaCalculator.appliesFor(diceValues);
  }

  calculate(diceValues, availableRolls) {
    return maxScores.DoubleGenerala;
  }
}

class FirstRollBonusDecorator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  appliesFor(diceValues, scoring) {
    return this.calculator.appliesFor(diceValues, scoring);
  }

  calculate(diceValues, availableRolls) {
    return this.calculator.calculate(diceValues) + 5;
  }
}

export const maxScores = {
  Ones: 5,
  Twos: 10,
  Threes: 15,
  Fours: 20,
  Fives: 25,
  Sixes: 30,
  Straight: 20,
  FullHouse: 30,
  FourOfAKind: 40,
  Generala: 50,
  DoubleGenerala: 100,
}
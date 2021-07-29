const getCombinations = (dices, scoring) => {
  let availableCombinations = 
    scoring
    .filter(x => !x.scratched && x.earned === 0)
    .map(x => x.combination);

  let numbers = Object.keys(dices).map(x => dices[x].value);
  let combinations = getNumberCombinations(numbers, availableCombinations);

  if (checkStraight(numbers) && availableCombinations.includes('Straight')) {
    combinations.push({combination: 'Straight', earned: 20});
  }

  if (checkFullHouse(numbers) && availableCombinations.includes('Full House')) {
    combinations.push({combination: 'Full House', earned: 30});
  }

  if (checkFourOfAKind(numbers) && availableCombinations.includes('Four of a Kind')) {
    combinations.push({combination: 'Four of a Kind', earned: 40});
  }

  if (checkGenerala(numbers) && availableCombinations.includes('Generala')) {
    combinations.push({combination: 'Generala', earned: 50});
  }

  if (checkDoubleGenerala(numbers) && availableCombinations.includes('Double Generala')) {
    combinations.push({combination: 'Double Generala', earned: 100});
  }

  return combinations;
};

const getNumberCombinations = (dices, availableCombinations) => {
  let counter = {}; 
  dices.forEach(x => counter[x] = (counter[x] || 0) + x);
  let result = [];
  for (const [key, value] of Object.entries(counter)) {
    if (availableCombinations.includes(nameMapping[key])) {
      result.push({combination: nameMapping[key], earned: value});
    }
  }

  return result;
}

const checkStraight = dices => {
  let unique = [...new Set(dices)]
  return unique.length === 5;
}

const checkFullHouse = dices => {
  let counter = {};
  dices.forEach(x => counter[x] = (counter[x] || 0) + 1);

  if (Object.keys(counter).length !== 2) {
    return false;
  }

  for (const [, amount] of Object.entries(counter)) {
    if (amount !== 2 && amount !== 3) {
      return false;
    }
  }

  return true;
}

const checkFourOfAKind = dices => {
  let counter = {};
  dices.forEach(x => counter[x] = (counter[x] || 0) + 1);

  if (Object.keys(counter).length !== 2) {
    return false;
  } 

  for (const [, amount] of Object.entries(counter)) {
    if (amount !== 4 && amount !== 1) {
      return false;
    }
  }

  return true;
}

const checkGenerala = dices => {
  let unique = [...new Set(dices)];
  return unique.length === 1;
}

const checkDoubleGenerala = dices => false;

const nameMapping = {
  1: 'Ones',
  2: 'Twos',
  3: 'Threes',
  4: 'Fours',
  5: 'Fives',
  6: 'Sixes'
};

export default getCombinations;
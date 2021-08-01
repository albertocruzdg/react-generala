export const initialDices = {
  0: {
    value: 1,
    blocked: false
  },
  1: {
    value: 2,
    blocked: false
  },
  2: {
    value: 3,
    blocked: false
  },
  3: {
    value: 4,
    blocked: false
  },
  4: {
    value: 5,
    blocked: false
  }
};

export const initialState = {
  dices: initialDices,
  availableRolls: 3,
  scoring: [{
    'combination': 'Ones',
    'points': 5,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Twos',
    'points': 10,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Threes',
    'points': 15,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Fours',
    'points': 20,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Fives',
    'points': 25,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Sixes',
    'points': 30,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Straight',
    'points': 20,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Full House',
    'points': 30,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Four of a Kind',
    'points': 40,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Generala',
    'points': 50,
    'earned': 0,
    'scratched': false
  },{
    'combination': 'Double Generala',
    'points': 100,
    'earned': 0,
    'scratched': false
  }]
};
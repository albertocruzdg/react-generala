import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { assignScore } from './diceSlice';
import getCombinations from './getCombinations';

const CombinationFinder = () => {
  const dispatch = useDispatch();
  const dices = useSelector(state => state.diceReducer.dices);
  const haveThrown = useSelector(state => state.diceReducer.availableRolls !== 3);
  const scoring = useSelector(state => state.diceReducer.scoring);
  let combinations = haveThrown ? getCombinations(dices, scoring) : [];

  const handleAdd = (combination, earned) => dispatch(assignScore({ combination, earned }));

  return (
    <table className="table">
      <thead>
        <tr>
          <td>Combination</td>
          <td>Points</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
      {combinations.map(x=>
        <tr key={x['combination']}>
          <td>{x['combination']}</td>
          <td>{x['earned']}</td>
          <td><button className="btn btn-primary" onClick={() => handleAdd(x['combination'], x['earned'])}>Add</button></td>
        </tr>)}
      </tbody>
    </table>
  );
};

export default CombinationFinder;
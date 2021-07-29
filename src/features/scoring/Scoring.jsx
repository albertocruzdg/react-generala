import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scratch } from '../dice/diceSlice';
import ScoringCombination from './ScoringCombination';
import './Scoring.css';

const getTotals = scoring => {
  let reducer = (accumulator, current) => ({
    'combination': 'Totals',
    'earned': accumulator['earned'] + current['earned'],
    'points': accumulator['points'] + current['points'],
    'scratched': false,
  });

  return scoring.reduce(reducer);
};

const Scoring = () => {
  const dispatch = useDispatch();
  const scoring = useSelector(state => state.diceReducer.scoring);
  const totals = useSelector(state => getTotals(state.diceReducer.scoring));
  
  return (
    <table className='table table-scoring'>
      <thead>
        <tr>
          <td>Combination</td>
          <td>Points earned</td>
          <td>Points</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {scoring.map(x=> <ScoringCombination 
          key={x['combination']} 
          combination={x['combination']} 
          earned={x['earned']} 
          points={x['points']} 
          scratched={x['scratched']} 
          onScratch={() => dispatch(scratch(x['combination']))}
        />)}
      </tbody>
      <tfoot>
        <ScoringCombination 
          combination={totals['combination']} 
          earned={totals['earned']} 
          points={totals['points']} 
          scratched={totals['scratched']} 
        />
      </tfoot>
    </table>
  );
};

export default Scoring;
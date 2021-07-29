import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { canThrow, blockToggled, dicesThrown } from './diceSlice';

import Dice from './Dice';
import DiceContainer from './DiceContainer';
import Button from '../../common/Button';

const getDiceNumber = () => Math.trunc(Math.random() * 6) + 1;

const DiceThrower = () => {
  const buttonEnabled = useSelector(canThrow);
  const dices = useSelector(state => state.diceReducer.dices);
  const unblockedDices = useSelector(state => Object.keys(state.diceReducer.dices).filter(x => !state.diceReducer.dices[x].blocked));
  const dispatch = useDispatch();

  const diceClicked = index => dispatch(blockToggled(index));
  
  const getThrownDices = () => {
    let result = {...dices};

    for (const key of unblockedDices) {
      result[key] = {
        value: getDiceNumber(),
        blocked: false
      };
    }

    return result;
  };

  const throwDiceHandler = () => {
    let newDices = getThrownDices();
    
    dispatch(dicesThrown(newDices));
  };

  return (
    <div>
      <Button disabled={!buttonEnabled} text="Throw Dices!" onClick={throwDiceHandler} />
      <div>
        <DiceContainer>
          {Object.keys(dices).map(x => 
            <Dice key={x} value={dices[x].value} blocked={dices[x].blocked} onClick={() => diceClicked(x)} />
          )}
        </DiceContainer>
      </div>
    </div>
  );
};

export default DiceThrower;
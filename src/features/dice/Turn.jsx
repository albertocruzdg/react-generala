import React from 'react';
import CombinationFinder from './CombinationFinder';
import DiceThrower from './DiceThrower';

const Turn = () => {
  return (
    <>
      <div className="row">
        <DiceThrower />
      </div>
      <div className="row">
        <div>
          <CombinationFinder />
        </div>
      </div>
    </>
  );
};

export default Turn;
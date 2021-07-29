import React from 'react';

import Scoring from './features/scoring/Scoring';
import Turn from './features/dice/Turn';

function App() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
            <Turn />
        </div>
        <div className='col-6'>
          <Scoring />
        </div>
      </div>
    </div>
  );
}

export default App;

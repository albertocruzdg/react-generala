import React from 'react';

const Cell = ({scratched, value}) => <td>{scratched? <del>{value}</del> : value}</td> 

const ScoringCombination = ({ combination, earned, points, scratched, onScratch }) => (
  <tr>
    <Cell scratched={scratched} value={combination} />
    <Cell scratched={scratched} value={earned} />
    <Cell scratched={scratched} value={points} />
    <td>
      <div className="scratch-button-container">
        {earned === 0 && !scratched ? <button className="btn btn-danger" onClick={onScratch}>Scratch</button> : ""}
      </div>
    </td>
  </tr>
);

export default ScoringCombination;
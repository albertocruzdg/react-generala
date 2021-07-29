import React from 'react';

const Dice = ({ value, blocked, onClick }) => (
  <div className="p-2">
    <i className={"fs-1 bi bi-dice-" + value + (blocked ? "-fill" : "")} onClick={onClick} />
  </div>
);

export default Dice;
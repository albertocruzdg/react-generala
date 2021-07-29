import React from 'react';

const Button = ({ disabled, text, onClick }) => 
  <button 
    type="button" 
    className={"btn " + (disabled ? "btn-secondary" : "btn-primary")}
    onClick={onClick}
    disabled={disabled}>
      {text}
  </button>;

export default Button;
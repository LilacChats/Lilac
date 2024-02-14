import React, { useState, useEffect } from 'react';
import '../Styles/Button.css';
import { ButtonProps } from '../../TypeModels/ButtonModel';

const Button: React.FC<ButtonProps> = ({
  label,
  keybinding,
  onClick = () => {},
}) => {
  const [hoverState, setHoverState] = useState<boolean>(false);
  return (
    <div
      className="ButtonContainer"
      style={{
        // borderColor: hoverState ? 'mediumpurple' : 'mediumpurple',
        border: `2px dashed`,
        color: hoverState ? 'mediumpurple' : '#272727',
      }}
      onMouseEnter={() => {
        setHoverState(true);
      }}
      onMouseLeave={() => {
        setHoverState(false);
      }}
      onClick={() => {
        onClick();
      }}
    >
      <div className="KeyBindingContainer">
        <div
          className="KeyBinding"
          style={{
            borderColor: hoverState ? 'mediumpurple' : '#9f9f9f',
            color: hoverState ? 'mediumpurple' : '#9f9f9f',
          }}
        >
          {keybinding}
        </div>
        <p style={{ color: '#9f9f9f' }}>{'->'}</p>
      </div>
      <div className="ButtonLabel">{label}</div>
    </div>
  );
};

export default Button;

import { useState } from 'react';
import { ButtonProps } from '../../types';
import '../Styles/Button.css';

const Button: React.FC<ButtonProps> = (props) => {
  const [hoverState, setHoverState] = useState<boolean>(false);
  return (
    <div
      onClick={props.onClick}
      style={props.style ? props.style : {}}
      className="ButtonContainer"
      onMouseEnter={() => {
        setHoverState(true);
      }}
      onMouseLeave={() => {
        setHoverState(false);
      }}
    >
      <div className={`KeyBindsContainer${hoverState ? 'Hover' : ''}`}>
        {props.keyCombination}
      </div>
      <div
        style={{
          textShadow: hoverState ? '0 0 9px #000000b3' : undefined,
          transition: '0.4s all',
        }}
      >
        {props.name}
      </div>
    </div>
  );
};

export default Button;

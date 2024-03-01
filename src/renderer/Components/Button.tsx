import { useState } from 'react';
import { ButtonProps } from '../../types';
import { useUIStateContext } from '../Contexts';
import '../Styles/Button.css';

const Button: React.FC<ButtonProps> = (props) => {
  const { mode } = useUIStateContext();
  const [hoverState, setHoverState] = useState<boolean>(false);
  return (
    <div
      onClick={props.onClick}
      style={props.style ? props.style : {}}
      className={`ButtonContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
      onMouseEnter={() => {
        setHoverState(true);
      }}
      onMouseLeave={() => {
        setHoverState(false);
      }}
    >
      {/* <div
        className={`KeyBindsContainer${hoverState ? 'Hover' : ''}${mode == 'dark' ? 'Dark' : 'Light'}`}
      >
        {props.keyCombination}
      </div>*/}
      <div
        style={{
          // textShadow: hoverState ? '0 0 9px #000000b3' : undefined,
          transition: '0.4s all',
        }}
      >
        {props.name}
      </div>
    </div>
  );
};

export default Button;

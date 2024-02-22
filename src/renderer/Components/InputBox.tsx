import { useEffect, useState } from 'react';
import '../Styles/InputBox.css';
import { InputBoxProps } from '../../types';
import { useAccountContext } from '../Contexts';

const InputBox: React.FC<InputBoxProps> = (props) => {
  const { name, email, password, serverURL } = useAccountContext();
  const [value, setValue] = useState<string>('');
  const [errorState, setErrorState] = useState<boolean>(false);

  useEffect(() => {
    if (props.triggerValidationFailAnimation != '') {
      let validationObject: string[] =
        props.triggerValidationFailAnimation.split('_');
      if (validationObject[2] == 'true') setErrorState(true);
      else setErrorState(false);
      switch (validationObject[1]) {
        case 'name':
          setValue(name);
          break;
        case 'email':
          setValue(email);
          break;
        case 'password':
          setValue(password);
          break;
        case 'server':
          setValue(serverURL);
          break;
        default:
          break;
      }
    }
  }, [props.triggerValidationFailAnimation]);

  return (
    <input
      key={props.triggerValidationFailAnimation}
      className={`InputBox${errorState ? 'ErrorState' : ''}`}
      style={props.style ? props.style : {}}
      type={props.type}
      value={value}
      placeholder={props.placeholder}
      onChange={(e) => {
        setErrorState(false);
        setValue(e.target.value);
        if (props.triggerValueChange) props.triggerValueChange(e.target.value);
      }}
    />
  );
};

export default InputBox;

import React, { useState, useEffect } from 'react';
import {
  validateEmail,
  validateName,
  validateServerURL,
} from '../../validator';
import {
  useProfileCreationBreakerContext,
  useProfileInfoContext,
} from '../Contexts';
import { InputBoxProps } from '../../TypeModels/InputBox';
import '../Styles/InputBox.css';

const InputBox: React.FC<InputBoxProps> = ({
  style,
  type,
  placeholder,
  errorState,
}) => {
  const { setBreakState } = useProfileCreationBreakerContext();
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    serverURL,
    setServerURL,
  } = useProfileInfoContext();
  const [message, setMessage] = useState<string>('');
  const [inputClass, setInputClass] = useState<string>('InputText');
  useEffect(() => {
    if (type === 'name' || type === 'email' || type === 'password') {
      if (validateEmail(email) && validateName(name) && password != '') {
        setBreakState(false);
      } else {
        setBreakState(true);
      }
    } else if (type === 'server') {
      if (validateServerURL(serverURL)) {
        setBreakState(false);
      } else {
        setBreakState(true);
      }
    }
  }, [type, name, email, password, serverURL]);
  useEffect(() => {
    if (errorState) setInputClass('InputTextErrorState');
  }, [errorState]);
  return (
    <div
      className="InputContainer"
      style={{ width: type == 'chat' ? '100%' : 'fit-content' }}
    >
      <input
        type={
          type === 'email' ||
          type === 'name' ||
          type === 'server' ||
          type == 'chat'
            ? 'text'
            : 'password'
        }
        style={style}
        className={inputClass}
        placeholder={placeholder}
        value={
          type === 'email'
            ? email
            : type === 'name'
            ? name
            : type === 'password'
            ? password
            : type === 'server'
            ? serverURL
            : message
        }
        onChange={(e) => {
          if (e.target.value != '') setInputClass('InputText');
          switch (type) {
            case 'email':
              setEmail(e.target.value);
              break;
            case 'name':
              setName(e.target.value);
              break;
            case 'password':
              setPassword(e.target.value);
              break;
            case 'server':
              setServerURL(e.target.value);
              break;
            case 'chat':
              setMessage(e.target.value);
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
};

export default InputBox;

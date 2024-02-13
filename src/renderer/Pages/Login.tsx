import React from 'react';
import Button from '../Components/Button';
import InputBox from '../Components/InputBox';
import { PLACEHOLDERS } from '../../objs';
import { useKeyBindsContext } from '../Contexts';
import '../Styles/HomePage.css';
import { LoginProps } from '../../TypeModels/LoginModel';

const Login: React.FC<LoginProps> = ({
  passwordErrorState,
  emailErrorState,
  serverURLErrorState,
}) => {
  return (
    <div style={{ gap: '50px' }} className="HomePage">
      <div className="Title">Login</div>
      <InputBox
        errorState={emailErrorState}
        style={{
          width: '250px',
        }}
        placeholder={PLACEHOLDERS.email}
        type="email"
      />
      <InputBox
        errorState={passwordErrorState}
        style={{
          width: '250px',
        }}
        placeholder={PLACEHOLDERS.password}
        type="password"
      />
      <InputBox
        errorState={serverURLErrorState}
        style={{
          width: '250px',
        }}
        placeholder={PLACEHOLDERS.server}
        type="server"
      />
    </div>
  );
};

export default Login;

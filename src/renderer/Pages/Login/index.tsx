import '../../Styles/Login.css';
import Button from '../../Components/Button';
import InputBox from '../../Components/InputBox';
import {
  useAccountContext,
  useKeyBindsContext,
  useUIStateContext,
} from '../../Contexts';
import { CHANNELS, INPUT_PLACEHOLDERS } from '../../../objs';
import { AppPages, InputBoxTypes } from '../../../types';
import { useEffect, useState } from 'react';
import { validateEmail, validateServerURL } from '../../../validator';
import { motion } from 'framer-motion';
import MutedButton from '../../Components/MutedButton';

const LoginPage: React.FC<{
  triggerPageChange: (page: AppPages) => void;
}> = (props) => {
  const { mode } = useUIStateContext();
  const { keyBinds, setKeyBinds } = useKeyBindsContext();
  const { email, password, serverURL, setEmail, setPassword, setServerURL } =
    useAccountContext();
  const [emailValidationString, setEmailValidationString] =
    useState<string>('');
  const [passwordValidationString, setPasswordValidationString] =
    useState<string>('');
  const [serverURLValidationString, setServerURLValidationString] =
    useState<string>('');
  window.electron.ipcRenderer.once(CHANNELS.LoadKeyBinds, (arg: any) => {
    setKeyBinds(arg.keyBinds);
  });

  function refreshComponent(
    compSetterFunction: Function,
    compLabel: InputBoxTypes,
    errorState: boolean,
  ) {
    console.log('Triggered ', compLabel);
    compSetterFunction(
      Math.floor(Date.now() / 1000).toString() +
        '_' +
        compLabel +
        '_' +
        errorState,
    );
  }

  window.electron.ipcRenderer.once(CHANNELS.VerifyLogin, (arg: any) => {
    if (arg.valid) {
      window.electron.ipcRenderer.sendMessage(CHANNELS.FetchServerData, {
        email: email,
        serverURL: serverURL,
        password: password,
      });
      props.triggerPageChange('Chat');
    } else {
    }
  });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(CHANNELS.LoadKeyBinds, {});
    refreshComponent(setEmailValidationString, 'email', false);
    refreshComponent(setPasswordValidationString, 'password', false);
    refreshComponent(setServerURLValidationString, 'server', false);
  }, []);

  const handleLogin = () => {
    let emailValidationStatus: boolean = true,
      passwordValidationStatus: boolean = true,
      serverURLValidationStatus: boolean = true;
    if (!validateEmail(email)) {
      emailValidationStatus = false;
      refreshComponent(setEmailValidationString, 'email', true);
    }
    if (password.length == 0) {
      console.log('Pass');
      passwordValidationStatus = false;
      refreshComponent(setPasswordValidationString, 'password', true);
    }
    if (!validateServerURL(serverURL)) {
      serverURLValidationStatus = false;
      refreshComponent(setServerURLValidationString, 'server', true);
    }
    if (
      serverURLValidationStatus &&
      emailValidationStatus &&
      passwordValidationStatus
    ) {
      //Verify Login
      window.electron.ipcRenderer.sendMessage(CHANNELS.VerifyLogin, {
        email: email,
        password: password,
        serverURL: serverURL,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
      }}
      className={`LoginContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      {/* <div className="Title">Login</div> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <InputBox
          triggerValidationFailAnimation={emailValidationString}
          triggerValueChange={(value: string) => {
            setEmail(value);
          }}
          style={{ width: '300px' }}
          type="text"
          placeholder={INPUT_PLACEHOLDERS.EMAIL}
        />
        <InputBox
          triggerValidationFailAnimation={passwordValidationString}
          triggerValueChange={(value: string) => {
            setPassword(value);
          }}
          style={{ width: '300px' }}
          type="password"
          placeholder={INPUT_PLACEHOLDERS.PASSWORD}
        />
        <InputBox
          triggerValidationFailAnimation={serverURLValidationString}
          triggerValueChange={(value: string) => {
            setServerURL(value);
          }}
          style={{ width: '300px' }}
          type="text"
          placeholder={INPUT_PLACEHOLDERS.SERVER}
        />
      </div>
      <Button
        keyCombination={keyBinds.LOGIN.keyCombination}
        name={keyBinds.LOGIN.name}
        onClick={handleLogin}
      />
      <div
        className={`BottomSignupContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
      >
        <MutedButton
          label="Create Your Account"
          direction="right"
          style={{
            width: '155px',
            position: 'absolute',
            alignItems: 'flex-end',
          }}
          clicked={() => {
            setEmail('');
            setPassword('');
            setServerURL('');
            props.triggerPageChange('Signup');
          }}
          className="CreateAccountLink"
        />
      </div>
    </motion.div>
  );
};

export default LoginPage;

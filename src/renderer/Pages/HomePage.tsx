import React, { useState, useEffect } from 'react';
import { Button } from '../Components/Components';
import {
  validateName,
  validateEmail,
  validateServerURL,
} from '../../validator';
import {
  useKeyBindsContext,
  useProfileInfoContext,
  useProfileCreationBreakerContext,
} from '../Contexts';
import ControlButton from '../Components/ControlButton';
import CreateProfile from './CreateProfile';
import Login from './Login';
import IndicatorContainer from '../Components/IndicatorContainer';
import { CHANNELS, PAGES } from '../../objs';
import '../Styles/HomePage.css';
import {
  LoadKeyBindsResObject,
  Signup_Response_Object,
} from '../../TypeModels/MainTypes';
import ChatPage from './ChatPage';

const HomePage = () => {
  const { keyBinds, setKeyBinds, setMaxChars } = useKeyBindsContext();
  const {
    name,
    pictureData,
    email,
    password,
    serverURL,
    setID,
    setName,
    setPictureData,
    setEmail,
    setServerURL,
  } = useProfileInfoContext();
  const { breakState, setBreakState } = useProfileCreationBreakerContext();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loginPageControlButtonState, setLoginPageControlButtonState] =
    useState<boolean>(false);
  const [createProfilePage, setCreateProfilePage] = useState<number>(-1);
  const [controlButtonState, setControlButtonState] = useState<boolean>(true);
  const [emailFieldErrorState, setEmailFieldErrorState] =
    useState<boolean>(false);
  const [nameFieldErrorState, setNameFieldErrorState] =
    useState<boolean>(false);
  const [passwordFieldErrorState, setPasswordFieldErrorState] =
    useState<boolean>(false);
  const [serverURLFieldErrorState, setServerURLFieldErrorState] =
    useState<boolean>(false);
  const [loginEmailFieldErrorState, setLoginEmailFieldErrorState] =
    useState<boolean>(false);
  const [loginPasswordFieldErrorState, setLoginPasswordFieldErrorState] =
    useState<boolean>(false);
  const [loginServerURLFieldErrorState, setLoginServerURLFieldErrorState] =
    useState<boolean>(false);
  window.electron.ipcRenderer.once(CHANNELS.LoadKeyBinds, (args: any) => {
    setKeyBinds(args.keyBinds);
    setMaxChars(args.maxChars);
  });

  window.electron.ipcRenderer.once(CHANNELS.VerifyLogin, (args: any) => {
    if (
      args.validationObject.emailValid &&
      args.validationObject.passwordValid
    ) {
      setName(args.data.name);
      setEmail(args.data.email);
      setPictureData(args.data.pictureData);
      setServerURL(args.data.serverURL);
      setCurrentPage(1);
    } else {
      manageErrorState(-2, true, args.validationObject);
    }
  });

  //REMOVE THIS CODE. THIS IS ONLY FOR TESTING.
  window.electron.ipcRenderer.once(CHANNELS.Override_INSECURE, (args: any) => {
    if (args.override) {
      setName(args.data.name);
      setEmail(args.data.email);
      setPictureData(args.data.pictureData);
      setServerURL(args.data.serverURL);
      setCurrentPage(1);
    }
  });

  window.electron.ipcRenderer.once(CHANNELS.SaveProfileData, (args: any) => {
    var response: Signup_Response_Object = { id: args.id };
    setID(response.id);
  });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(CHANNELS.LoadKeyBinds, {});
    window.electron.ipcRenderer.sendMessage(CHANNELS.Override_INSECURE, {});
  }, []);

  function manageErrorState(
    page: number,
    overrideValidation: boolean = false,
    attachedOverrideParams: any = {},
  ) {
    if (page == 1) {
      if (!validateEmail(email)) {
        setEmailFieldErrorState(false);
        setTimeout(() => {
          setEmailFieldErrorState(true);
        }, 100);
      } else setEmailFieldErrorState(false);
      if (!validateName(name)) {
        setNameFieldErrorState(false);
        setTimeout(() => {
          setNameFieldErrorState(true);
        }, 100);
      } else setNameFieldErrorState(false);
      if (password == '') {
        setPasswordFieldErrorState(false);
        setTimeout(() => {
          setPasswordFieldErrorState(true);
        }, 100);
      } else setPasswordFieldErrorState(false);
    } else if (page == 2) {
      if (!validateServerURL(serverURL)) {
        setServerURLFieldErrorState(false);
        setTimeout(() => {
          setServerURLFieldErrorState(true);
        }, 100);
      } else setServerURLFieldErrorState(false);
    } else if (page == -2) {
      if (!overrideValidation) {
        let emailStatus: boolean = false,
          passwordStatus: boolean = false,
          serverURLStatus: boolean = false;
        if (!validateServerURL(serverURL)) {
          setLoginServerURLFieldErrorState(false);
          setTimeout(() => {
            setLoginServerURLFieldErrorState(true);
          }, 100);
        } else {
          serverURLStatus = true;
          setLoginServerURLFieldErrorState(false);
        }
        if (!validateEmail(email)) {
          setLoginEmailFieldErrorState(false);
          setTimeout(() => {
            setLoginEmailFieldErrorState(true);
          }, 100);
        } else {
          emailStatus = true;
          setLoginEmailFieldErrorState(false);
        }
        if (password == '') {
          setLoginPasswordFieldErrorState(false);
          setTimeout(() => {
            setLoginPasswordFieldErrorState(true);
          }, 100);
        } else {
          passwordStatus = true;
          setLoginPasswordFieldErrorState(false);
        }
        if (emailStatus && passwordStatus && serverURLStatus) {
          window.electron.ipcRenderer.sendMessage(CHANNELS.VerifyLogin, {
            email: email,
            password: password,
          });
        }
      } else {
        if (!attachedOverrideParams.emailValid) {
          setLoginEmailFieldErrorState(false);
          setTimeout(() => {
            setLoginEmailFieldErrorState(true);
          }, 100);
        }
        if (!attachedOverrideParams.passwordValid) {
          setLoginPasswordFieldErrorState(false);
          setTimeout(() => {
            setLoginPasswordFieldErrorState(true);
          }, 100);
        }
      }
    }
  }

  return (
    <>
      {currentPage == 0 ? (
        <>
          {controlButtonState &&
          (createProfilePage == -2 || createProfilePage > -1) ? (
            <ControlButton
              loginPage={loginPageControlButtonState}
              lastPage={
                createProfilePage == PAGES - 1
                  ? true
                  : createProfilePage == -2
                  ? true
                  : false
              }
              setPage={(direction: string) => {
                if (direction === 'forward') {
                  if (!breakState || createProfilePage == 0) {
                    setCreateProfilePage(createProfilePage + 1);
                  }
                  manageErrorState(createProfilePage);
                } else if (direction === 'backward') {
                  setLoginPageControlButtonState(false);
                  if (createProfilePage >= -1)
                    setCreateProfilePage(createProfilePage - 1);
                  else setCreateProfilePage(-1);
                } else if (direction === 'triggerLogin') {
                  manageErrorState(createProfilePage);
                }
                // if (createProfilePage == PAGES - 1 && direction === 'forward')
                //   setCurrentPage(1);
              }}
            />
          ) : null}
          {createProfilePage > -1 ? (
            <>
              <CreateProfile
                displayPage={createProfilePage}
                emailErrorState={emailFieldErrorState}
                passwordErrorState={passwordFieldErrorState}
                nameErrorState={nameFieldErrorState}
                serverURLErrorState={serverURLFieldErrorState}
                acceptAgreement={() => {
                  setCurrentPage(1);
                  window.electron.ipcRenderer.sendMessage(
                    CHANNELS.SaveProfileData,
                    {
                      name: name,
                      email: email,
                      password: password,
                      pictureData: pictureData,
                      serverURL: serverURL,
                    },
                  );
                }}
              />
              <IndicatorContainer activePointer={createProfilePage} />
            </>
          ) : createProfilePage == -1 ? (
            <>
              <div className="HomePage">
                <div className="Title">Welcome to Lilac</div>
                <Button
                  label={keyBinds.SIGNUP.name}
                  keybinding={keyBinds.SIGNUP.keyCombination}
                  onClick={() => {
                    setCreateProfilePage(0);
                  }}
                />
                <Button
                  label={keyBinds.LOGIN.name}
                  keybinding={keyBinds.LOGIN.keyCombination}
                  onClick={() => {
                    setCreateProfilePage(-2);
                    setLoginPageControlButtonState(true);
                  }}
                />
              </div>
            </>
          ) : (
            <Login
              emailErrorState={loginEmailFieldErrorState}
              passwordErrorState={loginPasswordFieldErrorState}
              serverURLErrorState={loginServerURLFieldErrorState}
            />
          )}
        </>
      ) : currentPage == 1 ? (
        <div className="HomePage">
          <div className="Title">Welcome to Lilac</div>
          <div className="MainContainer">
            <div className="SubContainer">
              <Button
                label={keyBinds.CHATS.name}
                keybinding={keyBinds.CHATS.keyCombination}
                onClick={() => {
                  setCurrentPage(2);
                }}
              />
              <Button
                label={keyBinds.NEW_GROUP.name}
                keybinding={keyBinds.NEW_GROUP.keyCombination}
              />
            </div>
            <div className="SubContainer">
              <Button
                label={keyBinds.OPEN_SETTINGS.name}
                keybinding={keyBinds.OPEN_SETTINGS.keyCombination}
              />
              <Button
                label={keyBinds.SHOW_KEY_BINDS.name}
                keybinding={keyBinds.SHOW_KEY_BINDS.keyCombination}
              />
            </div>
          </div>
        </div>
      ) : currentPage == 2 ? (
        <ChatPage />
      ) : null}
    </>
  );
};

export default HomePage;

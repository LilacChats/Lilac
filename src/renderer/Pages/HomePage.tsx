import React, { useState, useEffect } from 'react';
import { Button } from '../Components/Components.tsx';
import {
  validateName,
  validateEmail,
  validateServerURL,
} from '../../validator.ts';
import {
  useKeyBindsContext,
  useProfileInfoContext,
  useProfileCreationBreakerContext,
} from '../Contexts.tsx';
import ControlButton from '../Components/ControlButton.tsx';
import CreateProfile from './CreateProfile.tsx';
import { HomePageProps } from '../../TypeModels/HomePageProps.d.ts';
import IndicatorContainer from '../Components/IndicatorContainer.tsx';
import { CHANNELS, PAGES } from '../../objs.ts';
import '../Styles/HomePage.css';

const HomePage = () => {
  const { keyBinds, setKeyBinds, setMaxChars } = useKeyBindsContext();
  const { name, email, password, serverURL } = useProfileInfoContext();
  const { breakState, setBreakState } = useProfileCreationBreakerContext();
  const [currentPage, setCurrentPage] = useState<number>(0);
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
  window.electron.ipcRenderer.once(CHANNELS.LoadKeyBinds, (args) => {
    setKeyBinds(args.keyBinds);
    setMaxChars(args.maxChars);
  });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(CHANNELS.LoadKeyBinds, {});
  }, []);

  function manageErrorState(page) {
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
    }
  }

  return (
    <>
      {currentPage == 0 ? (
        <>
          {controlButtonState && createProfilePage > -1 ? (
            <ControlButton
              lastPage={createProfilePage == PAGES - 1 ? true : false}
              setPage={(direction) => {
                if (direction === 'forward') {
                  if (!breakState) {
                    setCreateProfilePage(createProfilePage + 1);
                  }
                  manageErrorState(createProfilePage);
                } else setCreateProfilePage(createProfilePage - 1);
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
                }}
              />
              <IndicatorContainer activePointer={createProfilePage} />
            </>
          ) : (
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
                />
              </div>
            </>
          )}
        </>
      ) : (
        <div className="HomePage">
          <div className="Title">Welcome to Lilac</div>
          <div className="MainContainer">
            <div className="SubContainer">
              <Button
                label={keyBinds.NEW_CHAT.name}
                keybinding={keyBinds.NEW_CHAT.keyCombination}
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
      )}
    </>
  );
};

export default HomePage;

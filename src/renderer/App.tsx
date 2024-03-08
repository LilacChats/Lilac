import {
  AccountProvider,
  KeyBindsProvider,
  UIStateProvider,
  MessageProvider,
} from './Contexts';
import './Styles/App.css';
import { useState } from 'react';
import LoginPage from './Pages/Login/index';
import { AppPages } from '../types';
import SignupPage from './Pages/Signup/index';
import ChatHome from './Pages/Chat';
import UISwitcher from './Components/UISwitcher';

const App = () => {
  const [pageState, setPageState] = useState<AppPages>('Login');
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          width: '50%',
          zIndex: '2',
          left: '30%',
          height: '40px',
          // background: 'white',
          webkitAppRegion: 'drag',
        }}
      ></div>
      <UIStateProvider>
        <AccountProvider>
          <KeyBindsProvider>
            {pageState === 'Login' ? (
              <LoginPage
                triggerPageChange={(page) => {
                  setPageState(page);
                }}
              />
            ) : pageState === 'Signup' ? (
              <SignupPage
                triggerPageChange={(page) => {
                  setPageState(page);
                }}
              />
            ) : (
              <MessageProvider>
                <ChatHome />
              </MessageProvider>
            )}
            <UISwitcher />
          </KeyBindsProvider>
        </AccountProvider>
      </UIStateProvider>
    </div>
  );
};

export default App;

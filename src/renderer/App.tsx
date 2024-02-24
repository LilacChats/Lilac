import { AccountProvider, KeyBindsProvider } from './Contexts';
import './Styles/App.css';
import { useState } from 'react';
import LoginPage from './Pages/Login/index';
import { AppPages } from '../types';
import SignupPage from './Pages/Signup/index';

const App = () => {
  const [pageState, setPageState] = useState<AppPages>('Login');
  return (
    <div>
      <AccountProvider>
        <KeyBindsProvider>
          {pageState === 'Login' ? (
            <LoginPage
              triggerPageChange={(page) => {
                setPageState(page);
              }}
            />
          ) : (
            <SignupPage
              triggerPageChange={(page) => {
                setPageState(page);
              }}
            />
          )}
        </KeyBindsProvider>
      </AccountProvider>
    </div>
  );
};

export default App;

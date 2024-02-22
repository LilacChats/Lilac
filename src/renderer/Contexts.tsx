import { createContext, useContext } from 'react';
import {
  EMPTY_KEYBINDS,
  INITIAL_ACCOUNT_CONTEXT,
  INITIAL_KEYBINDS_CONTEXT,
} from '../objs';
import { AccountContext, KeyBinds, KeyBindsContext } from '../types';
import { useState } from 'react';

const KeyBindContext: React.Context<KeyBindsContext> = createContext(
  INITIAL_KEYBINDS_CONTEXT,
);

const AccountContext: React.Context<AccountContext> = createContext(
  INITIAL_ACCOUNT_CONTEXT,
);

const KeyBindsProvider: React.FC<any> = ({ children }) => {
  const [keyBinds, setKeyBinds] = useState<KeyBinds>(EMPTY_KEYBINDS);
  return (
    <KeyBindContext.Provider value={{ keyBinds, setKeyBinds }}>
      {children}
    </KeyBindContext.Provider>
  );
};

const AccountProvider: React.FC<any> = ({ children }) => {
  const [name, setName] = useState<string>(INITIAL_ACCOUNT_CONTEXT.name);
  const [email, setEmail] = useState<string>(INITIAL_ACCOUNT_CONTEXT.email);
  const [password, setPassword] = useState<string>(
    INITIAL_ACCOUNT_CONTEXT.password,
  );
  const [pictureData, setPictureData] = useState<string>(
    INITIAL_ACCOUNT_CONTEXT.pictureData,
  );
  const [serverURL, setServerURL] = useState<string>(
    INITIAL_ACCOUNT_CONTEXT.serverURL,
  );
  return (
    <AccountContext.Provider
      value={{
        name,
        email,
        password,
        pictureData,
        serverURL,
        setName,
        setEmail,
        setPassword,
        setPictureData,
        setServerURL,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

const useKeyBindsContext = () => useContext(KeyBindContext);
const useAccountContext = () => useContext(AccountContext);

export {
  KeyBindsProvider,
  AccountProvider,
  useKeyBindsContext,
  useAccountContext,
};

import { createContext, useContext } from 'react';
import {
  EMPTY_KEYBINDS,
  INITIAL_ACCOUNT_CONTEXT,
  INITIAL_KEYBINDS_CONTEXT,
  INITIAL_UI_STATE_CONTEXT,
  INITIAL_MESSAGE_CONTEXT,
} from '../objs';
import {
  AccountContext,
  KeyBinds,
  KeyBindsContext,
  MessageContext,
} from '../types';
import { useState } from 'react';

const KeyBindContext: React.Context<KeyBindsContext> = createContext(
  INITIAL_KEYBINDS_CONTEXT,
);

const AccountContext: React.Context<AccountContext> = createContext(
  INITIAL_ACCOUNT_CONTEXT,
);

const UIStateContext: React.Context<UIStateContext> = createContext(
  INITIAL_UI_STATE_CONTEXT,
);

const MessageContext: React.Context<MessageContext> = createContext(
  INITIAL_MESSAGE_CONTEXT,
);

const MessageProvider: React.FC<any> = ({ children }) => {
  const [message, setMessage] = useState<string>(
    INITIAL_MESSAGE_CONTEXT.message,
  );
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

const UIStateProvider: React.FC<any> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    INITIAL_UI_STATE_CONTEXT.mode,
  );
  const [pageID, setPageID] = useState<number>(INITIAL_UI_STATE_CONTEXT.pageID);
  return (
    <UIStateContext.Provider value={{ mode, setMode, pageID, setPageID }}>
      {children}
    </UIStateContext.Provider>
  );
};

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
  const [id, setID] = useState<string>(INITIAL_ACCOUNT_CONTEXT.id);
  return (
    <AccountContext.Provider
      value={{
        name,
        id,
        email,
        password,
        pictureData,
        serverURL,
        setID,
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
const useUIStateContext = () => useContext(UIStateContext);
const useMessageContext = () => useContext(MessageContext);

export {
  KeyBindsProvider,
  AccountProvider,
  useKeyBindsContext,
  useAccountContext,
  useUIStateContext,
  UIStateProvider,
  MessageProvider,
  useMessageContext,
};

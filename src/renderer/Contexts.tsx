import { createContext, useContext, useState, useEffect } from 'react';
import {
  Bindings,
  KeyBindsContextParams,
  ProfileCreationBreakerContextParams,
  ProfileInfoContextParams,
} from '../TypeModels/MainTypes';
import {
  EMPTY_BINDINGS_OBJECT,
  INITIAL_KEYBINDS_CONTEXT_OBJECT,
  INITIAL_PROFILECREATIONBREAKER_CONTEXT_OBJECT,
  INITIAL_PROFILEINFO_CONTEXT_OBJECT,
} from '../objs';

const KeyBindsContext: React.Context<KeyBindsContextParams> = createContext(
  INITIAL_KEYBINDS_CONTEXT_OBJECT,
);
const ProfileCreationBreakerContext: React.Context<ProfileCreationBreakerContextParams> =
  createContext(INITIAL_PROFILECREATIONBREAKER_CONTEXT_OBJECT);
const ProfileInfoContext: React.Context<ProfileInfoContextParams> =
  createContext(INITIAL_PROFILEINFO_CONTEXT_OBJECT);

const ProfileInfoProvider: React.FC<any> = ({ children }) => {
  const [pictureData, setPictureData] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [serverURL, setServerURL] = useState<string>('');
  const [id, setID] = useState<string>('');
  return (
    <ProfileInfoContext.Provider
      value={{
        serverURL,
        setServerURL,
        email,
        setEmail,
        name,
        setName,
        password,
        setPassword,
        pictureData,
        setPictureData,
        id,
        setID,
      }}
    >
      {children}
    </ProfileInfoContext.Provider>
  );
};

const ProfileCreationBreakerProvider: React.FC<any> = ({ children }) => {
  const [breakState, setBreakState] = useState<boolean>(false);
  return (
    <ProfileCreationBreakerContext.Provider
      value={{ breakState, setBreakState }}
    >
      {children}
    </ProfileCreationBreakerContext.Provider>
  );
};

const KeyBindsProvider: React.FC<any> = ({ children }) => {
  const [keyBinds, setKeyBinds] = useState<Bindings>(EMPTY_BINDINGS_OBJECT);
  const [maxChars, setMaxChars] = useState<number>(0);
  return (
    <KeyBindsContext.Provider
      value={{ keyBinds, setKeyBinds, maxChars, setMaxChars }}
    >
      {children}
    </KeyBindsContext.Provider>
  );
};

const useProfileInfoContext = () => useContext(ProfileInfoContext);
const useKeyBindsContext = () => useContext(KeyBindsContext);
const useProfileCreationBreakerContext = () =>
  useContext(ProfileCreationBreakerContext);

export {
  KeyBindsContext,
  KeyBindsProvider,
  useKeyBindsContext,
  ProfileCreationBreakerContext,
  useProfileCreationBreakerContext,
  ProfileCreationBreakerProvider,
  ProfileInfoContext,
  useProfileInfoContext,
  ProfileInfoProvider,
};

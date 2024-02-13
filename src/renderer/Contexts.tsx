import { createContext, useContext, useState, useEffect } from 'react';
import { EMPTY_BINDINGS_OBJECT } from '../objs.ts';

const KeyBindsContext = createContext();
const ProfileCreationBreakerContext = createContext();
const ProfileInfoContext = createContext();

const ProfileInfoProvider = ({ children }) => {
  const [pictureData, setPictureData] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [serverURL, setServerURL] = useState<string>('');
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
      }}
    >
      {children}
    </ProfileInfoContext.Provider>
  );
};

const ProfileCreationBreakerProvider = ({ children }) => {
  const [breakState, setBreakState] = useState<boolean>(false);
  return (
    <ProfileCreationBreakerContext.Provider
      value={{ breakState, setBreakState }}
    >
      {children}
    </ProfileCreationBreakerContext.Provider>
  );
};

const KeyBindsProvider = ({ children }) => {
  const [keyBinds, setKeyBinds] = useState<any>(EMPTY_BINDINGS_OBJECT);
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

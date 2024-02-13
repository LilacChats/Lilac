import { createContext, useContext, useState, useEffect } from 'react';
import { Bindings } from '../TypeModels/MainTypes';
import { EMPTY_BINDINGS_OBJECT, KeyBindingContextType } from '../objs';

const KeyBindsContext: React.Context<any> = createContext({});
const ProfileCreationBreakerContext: React.Context<any> = createContext({});
const ProfileInfoContext: React.Context<any> = createContext({});

const ProfileInfoProvider: React.FC<any> = ({ children }) => {
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

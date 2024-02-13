import { Bindings, ChannelObject, RegexObect } from './TypeModels/MainTypes';
import ProfilePicture from './renderer/Components/ProfilePicture';
import InputBox from './renderer/Components/InputBox';

const CHANNELS: ChannelObject = {
  LoadKeyBinds: 'LoadKeyBinds',
  SelectProfilePicture: 'SelectProfilePicture',
  SaveProfileData: 'SaveProfileData',
  VerifyLogin: 'VerifyLogin',
  Override_INSECURE: 'Override_INSECURE',
};

const EMPTY_BINDINGS_OBJECT: Bindings = {
  NEW_CHAT: { name: '', keyCombination: [] },
  NEW_GROUP: { name: '', keyCombination: [] },
  OPEN_SETTINGS: { name: '', keyCombination: [] },
  SHOW_KEY_BINDS: { name: '', keyCombination: [] },
  BACK: { name: '', keyCombination: [] },
  FORWARD: { name: '', keyCombination: [] },
  SIGNUP: { name: '', keyCombination: [] },
  LOGIN: { name: '', keyCombination: [] },
  ACCEPT_AGREEMENT: { name: '', keyCombination: [] },
  REJECT_AGREEMENT: { name: '', keyCombination: [] },
};

const PAGES: number = 4;

const PLACEHOLDERS = {
  name: 'Enter your Name',
  email: 'Enter your Email ID',
  password: 'Enter your Password',
  server: 'Server URL Eg: https://hellokitty.com',
};

const REGEX_STRINGS: RegexObect = {
  EMAIL: new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+$`),
  NAME: new RegExp(`^[a-zA-Z ]+$`),
  SERVER_URL: new RegExp(`^http(s)?://\\S+$`),
};

type KeyBindingContextType = {
  keyBinds: Bindings;
  maxChars: number;
  setMaxChars: Function;
  setKeyBinds: Function;
};

export {
  CHANNELS,
  EMPTY_BINDINGS_OBJECT,
  PAGES,
  PLACEHOLDERS,
  REGEX_STRINGS,
  KeyBindingContextType,
};

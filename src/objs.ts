import {
  Bindings,
  ChannelObject,
  RegexObject,
} from './TypeModels/MainTypes.d.ts';
import ProfilePicture from './renderer/Components/ProfilePicture.tsx';
import InputBox from './renderer/Components/InputBox.tsx';

const CHANNELS: ChannelObject = {
  LoadKeyBinds: 'LoadKeyBinds',
  SelectProfilePicture: 'SelectProfilePicture',
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

const REGEX_STRINGS: RegexObject = {
  EMAIL: new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+$`),
  NAME: new RegExp(`^[a-zA-Z ]+$`),
  SERVER_URL: new RegExp(`^http(s)?://\\S+$`),
};

export { CHANNELS, EMPTY_BINDINGS_OBJECT, PAGES, PLACEHOLDERS, REGEX_STRINGS };

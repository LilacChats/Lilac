import {
  AccountContext,
  ChannelType,
  KeyBindingObject,
  KeyBinds,
  Placeholders,
  RegexObect,
  SignupAnimationObject,
  UIStateContext,
  MessageContext,
  Message,
} from './types';

const EMPTY_KEYBIND_OBJ: KeyBindingObject = { name: '', keyCombination: [] };

const EMPTY_KEYBINDS: KeyBinds = {
  CHATS: EMPTY_KEYBIND_OBJ,
  NEW_GROUP: EMPTY_KEYBIND_OBJ,
  OPEN_SETTINGS: EMPTY_KEYBIND_OBJ,
  SHOW_KEY_BINDS: EMPTY_KEYBIND_OBJ,
  BACK: EMPTY_KEYBIND_OBJ,
  FORWARD: EMPTY_KEYBIND_OBJ,
  SIGNUP: EMPTY_KEYBIND_OBJ,
  LOGIN: EMPTY_KEYBIND_OBJ,
  ACCEPT_AGREEMENT: EMPTY_KEYBIND_OBJ,
  REJECT_AGREEMENT: EMPTY_KEYBIND_OBJ,
  SEND_CHAT: EMPTY_KEYBIND_OBJ,
  EDIT_PICTURE: EMPTY_KEYBIND_OBJ,
  SAVE_PICTURE: EMPTY_KEYBIND_OBJ,
};

const INITIAL_KEYBINDS_CONTEXT = {
  keyBinds: EMPTY_KEYBINDS,
  setKeyBinds: (keyBinds: KeyBinds) => {},
};

const INITIAL_ACCOUNT_CONTEXT: AccountContext = {
  name: '',
  email: '',
  password: '',
  pictureData: '',
  serverURL: '',
  id: '',
  setID: () => {},
  setName: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setPictureData: () => {},
  setServerURL: () => {},
};

const TO_RADIANS = Math.PI / 180;

const INPUT_PLACEHOLDERS: Placeholders = {
  EMAIL: 'Enter your Email Address',
  NAME: 'Enter your Name',
  PASSWORD: 'Enter your Password',
  SERVER: 'Enter Server URL',
};

const CHANNELS: ChannelType = {
  LoadKeyBinds: 'LoadKeyBinds',
  SelectProfilePicture: 'SelectProfilePicture',
  VerifyLogin: 'VerifyLogin',
  FetchServerData: 'FetchServerData',
  SaveUIState: 'SaveUIState',
  Signup: 'Signup',
};

const INITIAL_UI_STATE_CONTEXT: UIStateContext = {
  pageID: 0,
  mode: 'dark',
  setMode: () => {},
  setPageID: () => {},
};

const INITIAL_MESSAGE_CONTEXT: MessageContext = {
  message: '',
  setMessage: (message: string) => {},
};

const REGEX_STRINGS: RegexObect = {
  EMAIL: new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+$`),
  NAME: new RegExp(`^[a-zA-Z ]+$`),
  SERVER_URL: new RegExp(`^http(s)?://\\S+$`),
};

const SIGNUP_ANIMATION_OBJS: SignupAnimationObject = {
  exitLeft: {
    x: -1000,
    opacity: 0,
  },
  exitRight: {
    x: 1000,
    opacity: 0,
  },
  initialLeft: {
    x: 1000,
    opacity: 0,
  },
  initialRight: {
    x: -1000,
    opacity: 0,
  },
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
  },
};

const MESSAGES: Message[] = [
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: '',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: '',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: '',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
  {
    type: 'text',
    timestamp: parseInt(Date.now() / 1000),
    senderID: 'xyz',
    data: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
  },
];

export {
  MESSAGES,
  EMPTY_KEYBINDS,
  INITIAL_KEYBINDS_CONTEXT,
  CHANNELS,
  INPUT_PLACEHOLDERS,
  REGEX_STRINGS,
  INITIAL_ACCOUNT_CONTEXT,
  TO_RADIANS,
  SIGNUP_ANIMATION_OBJS,
  INITIAL_UI_STATE_CONTEXT,
  INITIAL_MESSAGE_CONTEXT,
};

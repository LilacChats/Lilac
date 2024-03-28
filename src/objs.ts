import {
  AccountContext,
  KeyBindingObject,
  KeyBinds,
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
  ADD_GROUP: EMPTY_KEYBIND_OBJ,
  CANCEL_GROUP: EMPTY_KEYBIND_OBJ,
  UPDATE_GROUP: EMPTY_KEYBIND_OBJ,
  PROCEED: EMPTY_KEYBIND_OBJ,
  LOGOUT: EMPTY_KEYBIND_OBJ,
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

const enum INPUT_PLACEHOLDERS {
  EMAIL = 'Enter your Email Address',
  NAME = 'Enter your Name',
  PASSWORD = 'Enter your Password',
  SERVER = 'Enter Server URL',
}

const enum CHANNELS {
  LoadKeyBinds = 'LoadKeyBinds',
  SelectProfilePicture = 'SelectProfilePicture',
  VerifyLogin = 'VerifyLogin',
  FetchServerData = 'FetchServerData',
  SaveUIState = 'SaveUIState',
  Signup = 'Signup',
  AddGroup = 'AddGroup',
  DeleteGroup = 'DeleteGroup',
  FetchGroupData = 'FetchGroupData',
  UpdateGroup = 'UpdateGroup',
  Logout = 'Logout',
  SendMessage = 'SendMessage',
  TriggerChat = 'TriggerChat',
  FetchID = 'FetchID',
  FetchChatData = 'FetchChatData',
}

const INITIAL_UI_STATE_CONTEXT: UIStateContext = {
  pageID: 0,
  mode: 'dark',
  addGroupDialogState: false,
  setAddGroupDialogState: () => {},
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

const enum SOCKET_EVENTS {
  REGISTER = 'register',
  SEND_CHAT = 'sendchat',
  FETCH_CHATS = 'fetchchats',
  REFRESH = 'refresh',
  DEREGISTER = 'deregister',
}

const MESSAGES: Message[] = [
  {
    timestamp: parseInt(Date.now() / 1000 + ''),
    senderID: 'xyz',
    receiverID: ' oemf',
    message: `Hi there I'm here and bla bla bla heheheeeheefinwefiwf ewrofiwefoimwef weofinweofmwef woeifweofewofn`,
    messageID: 'weif',
  },
];

export {
  SOCKET_EVENTS,
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

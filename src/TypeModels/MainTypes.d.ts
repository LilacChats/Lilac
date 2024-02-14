type KeyBindingObject = {
  name: string;
  keyCombination: string[];
};

type Bindings = {
  CHATS: KeyBindingObject;
  NEW_GROUP: KeyBindingObject;
  OPEN_SETTINGS: KeyBindingObject;
  SHOW_KEY_BINDS: KeyBindingObject;
  BACK: KeyBindingObject;
  FORWARD: KeyBindingObject;
  SIGNUP: KeyBindingObject;
  LOGIN: KeyBindingObject;
  ACCEPT_AGREEMENT: KeyBindingObject;
  REJECT_AGREEMENT: KeyBindingObject;
  SEND_CHAT: KeyBindingObject;
};

type ControlButtonStateObject = {
  show: boolean;
  stateData: KeyBindingObject;
};

type ProfileData = {
  name: string;
  email: string;
  password: string;
  pictureData: string;
};

type ChannelName =
  | 'LoadKeyBinds'
  | 'SelectProfilePicture'
  | 'SaveProfileData'
  | 'VerifyLogin'
  | 'Override_INSECURE';
type ChannelObject = {
  [key: string]: ChannelName;
};

type LoadKeyBindsResObject = { keyBinds: Bindings; maxChars: number };

type VerifyLoginReqObject = {
  email: string;
  password: string;
};

type RegexObect = {
  NAME: RegExp;
  EMAIL: RegExp;
  SERVER_URL: RegExp;
};

type FileDialogObject = {
  filePaths: string[];
  canceled: boolean;
};

type KeyBindsContextParams = {
  keyBinds: Bindings;
  maxChars: number;
  setKeyBinds: (keyBinds: Bindings) => void;
  setMaxChars: (maxChars: number) => void;
};

type ProfileCreationBreakerContextParams = {
  breakState: boolean;
  setBreakState: (breakState: boolean) => void;
};

type ProfileInfoContextParams = {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  serverURL: string;
  setServerURL: (serverURL: string) => void;
  pictureData: string;
  setPictureData: (pictureData: string) => void;
};

export {
  Bindings,
  KeyBindingObject,
  ChannelObject,
  FileDialogObject,
  RegexObect,
  VerifyLoginReqObject,
  LoadKeyBindsResObject,
  KeyBindsContextParams,
  ProfileCreationBreakerContextParams,
  ProfileInfoContextParams,
};

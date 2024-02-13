type KeyBindingObject = {
  name: string;
  keyCombination: string[];
};

type Bindings = {
  NEW_CHAT: KeyBindingObject;
  NEW_GROUP: KeyBindingObject;
  OPEN_SETTINGS: KeyBindingObject;
  SHOW_KEY_BINDS: KeyBindingObject;
  BACK: KeyBindingObject;
  FORWARD: KeyBindingObject;
  SIGNUP: KeyBindingObject;
  LOGIN: KeyBindingObject;
  ACCEPT_AGREEMENT: KeyBindingObject;
  REJECT_AGREEMENT: KeyBindingObject;
};

type ControlButtonStateObject = {
  show: boolean;
  stateData: KeyBindingObject;
};

type Channels = 'LoadKeyBinds';
type ChannelObject = {
  LoadKeyBinds: Channels;
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

export {
  Bindings,
  KeyBindingObject,
  Channels,
  ChannelObject,
  RegexObject,
  FileDialogObject,
};

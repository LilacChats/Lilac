import { TargetAndTransition, VariantLabels } from 'framer-motion';
import { ComponentProps } from 'react';
import { Crop, PercentCrop, PixelCrop } from 'react-image-crop';

type KeyBindingObject = {
  name: string;
  keyCombination: string[];
};

type KeyBinds = {
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
  EDIT_PICTURE: KeyBindingObject;
  SAVE_PICTURE: KeyBindingObject;
  ADD_GROUP: KeyBindingObject;
  CANCEL_GROUP: KeyBindingObject;
};

type DMData = {
  Name: string;
  ID: string;
  PictureData: string;
};

type ButtonProps = {
  onClick?: () => void;
  style?: React.CSSProperties;
} & KeyBindingObject;

type KeyBindsContext = {
  keyBinds: KeyBinds;
  setKeyBinds: (keyBinds: KeyBinds) => void;
};

type AccountContext = {
  name: string;
  email: string;
  password: string;
  pictureData: string;
  serverURL: string;
  id: string;
  setID: (id: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPictureData: (pictureData: string) => void;
  setServerURL: (serverURL: string) => void;
};

type MessageContext = {
  message: string;
  setMessage: (message: string) => void;
};

type UIStateContext = {
  addGroupDialogState: boolean;
  setAddGroupDialogState: (addGroupDialogState: boolean) => void;
  mode: 'dark' | 'light';
  setMode: (mode: 'dark' | 'light') => void;
  pageID: number;
  setPageID: (pageID: number) => void;
};

type FileDialogObject = {
  filePaths: string[];
  canceled: boolean;
};

type ChannelType = {
  LoadKeyBinds: 'LoadKeyBinds';
  SelectProfilePicture: 'SelectProfilePicture';
  VerifyLogin: 'VerifyLogin';
  FetchServerData: 'FetchServerData';
  SaveUIState: 'SaveUIState';
  Signup: 'Signup';
  AddGroup: "AddGroup"
};

type AppPages = 'Login' | 'Signup' | 'Chat';

type InputBoxTypes = 'name' | 'email' | 'password' | 'server';

type Placeholders = {
  NAME: string;
  EMAIL: string;
  PASSWORD: string;
  SERVER: string;
};

type RegexObect = {
  NAME: RegExp;
  EMAIL: RegExp;
  SERVER_URL: RegExp;
};

//Component Props
type InputBoxProps = {
  placeholder: string;
  triggerValueChange?: (value: string) => void;
  type: 'text' | 'password' | 'number';
  style?: React.CSSProperties;
  triggerValidationFailAnimation: string;
};

//Page Props
type PageContainerProps = {
  page: number;
  direction: string;
  initialState?: number;
  componentLoaded?: Function;
  children: ComponentProps<any>;
  style?: React.CSSProperties;
};

type PictureEditPageProps = {
  onCropChanged: (percentCrop: PercentCrop) => void;
  previewCanvasRef: React.Ref<HTMLCanvasElement>;
  cropCompleted: PixelCrop | undefined;
  onCropCompleted: (c: PixelCrop) => void;
  onPictureLoaded: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  crop: Crop | undefined;
  onSubmit: Function;
  imgRef: React.Ref<HTMLImageElement>;
};

type SignupAnimationObject = {
  exitLeft: Object;
  exitRight: Object;
  animate: Object;
  initialLeft: Object;
  initialRight: Object;
};

type PollMessageData = {
  name: string;
  voteCount: number;
}[];

type TextMessageData = string;

type ImageMessageData = string;

type VideoMessageData = string;

type FileMessageData = string;

type Message = {
  timestamp: number;
  senderID: string;
  type: 'text' | 'code' | 'image' | 'video' | 'poll' | 'file';
  data:
    | TextMessageData
    | ImageMessageData
    | VideoMessageData
    | FileMessageData
    | PollMessageData;
};

export {
  Message,
  KeyBinds,
  KeyBindingObject,
  ButtonProps,
  KeyBindsContext,
  ChannelType,
  AppPages,
  InputBoxProps,
  Placeholders,
  RegexObect,
  AccountContext,
  InputBoxTypes,
  FileDialogObject,
  SignupAnimationObject,
  PictureEditPageProps,
  PageContainerProps,
  UIStateContext,
  MessageContext,
  DMData,
};

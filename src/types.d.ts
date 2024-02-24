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
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPictureData: (pictureData: string) => void;
  setServerURL: (serverURL: string) => void;
};

type FileDialogObject = {
  filePaths: string[];
  canceled: boolean;
};

type ChannelType = {
  LoadKeyBinds: 'LoadKeyBinds';
  SelectProfilePicture: 'SelectProfilePicture';
};

type AppPages = 'Login' | 'Signup';

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
type SignupPageProps = {
  triggerPageChange: (page: AppPages) => void;
};

type LoginPageProps = {
  triggerPageChange: (page: AppPages) => void;
};

type PageContainerProps = {
  page: number;
  direction: string;
  initialState?: number;
  componentLoaded?: Function;
  children: ComponentProps<any>;
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

export {
  KeyBinds,
  KeyBindingObject,
  ButtonProps,
  KeyBindsContext,
  ChannelType,
  AppPages,
  InputBoxProps,
  Placeholders,
  RegexObect,
  LoginPageProps,
  SignupPageProps,
  AccountContext,
  InputBoxTypes,
  FileDialogObject,
  SignupAnimationObject,
  PictureEditPageProps,
  PageContainerProps,
};

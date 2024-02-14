import {
  Bindings,
  ChannelObject,
  KeyBindingObject,
  KeyBindsContextParams,
  ProfileCreationBreakerContextParams,
  ProfileInfoContextParams,
  RegexObect,
} from './TypeModels/MainTypes';
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
  CHATS: { name: '', keyCombination: [] },
  NEW_GROUP: { name: '', keyCombination: [] },
  OPEN_SETTINGS: { name: '', keyCombination: [] },
  SHOW_KEY_BINDS: { name: '', keyCombination: [] },
  BACK: { name: '', keyCombination: [] },
  FORWARD: { name: '', keyCombination: [] },
  SIGNUP: { name: '', keyCombination: [] },
  LOGIN: { name: '', keyCombination: [] },
  ACCEPT_AGREEMENT: { name: '', keyCombination: [] },
  REJECT_AGREEMENT: { name: '', keyCombination: [] },
  SEND_CHAT: { name: '', keyCombination: [] },
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

const INITIAL_KEYBINDS_CONTEXT_OBJECT: KeyBindsContextParams = {
  keyBinds: EMPTY_BINDINGS_OBJECT,
  maxChars: 0,
  setKeyBinds: (keyBinds: Bindings) => {},
  setMaxChars: (maxChars: number) => {},
};

const INITIAL_PROFILECREATIONBREAKER_CONTEXT_OBJECT: ProfileCreationBreakerContextParams =
  {
    breakState: false,
    setBreakState: (breakState: boolean) => {},
  };

const INITIAL_PROFILEINFO_CONTEXT_OBJECT: ProfileInfoContextParams = {
  name: '',
  email: '',
  password: '',
  serverURL: '',
  pictureData: '',
  setName: (name: string) => {},
  setEmail: (email: string) => {},
  setPassword: (password: string) => {},
  setServerURL: (serverURL: string) => {},
  setPictureData: (pictureData: string) => {},
};
const MESSAGES = [
  {
    name: 'rose',
    message:
      "Hey there! How's your day been so far? I've been quite busy with work, but I managed to take a short break to grab a coffee. Have you tried that new coffee shop downtown? It's really cozy and the coffee is amazing!",
  },
  {
    name: 'rose',
    message:
      "Oh, that sounds nice! My day has been pretty hectic too. I've been working on this project non-stop, but I think I'm finally making some progress. By the way, I heard about the new coffee shop but haven't had the chance to check it out yet. I'll definitely give it a try sometime!",
  },
  {
    name: 'rose',
    message:
      "You should definitely check it out! It's a great place to unwind after a busy day. Speaking of projects, how's yours going? Need any help with it?",
  },
  {
    name: 'rose',
    message:
      "Thanks for offering! Yeah, I could use some help with a few things. There are a couple of issues I've been trying to figure out, and having a fresh pair of eyes would be really helpful.",
  },
  {
    name: 'rose',
    message:
      "No problem at all! I'd be happy to take a look and see if I can offer any insights. We could also bounce some ideas off each other and brainstorm solutions together.",
  },
  {
    name: 'rose',
    message:
      "That sounds like a plan! Let's schedule some time tomorrow to go over the project together. I'll bring my notes and we can tackle those issues head-on.",
  },
  {
    name: 'rose',
    message:
      "Sounds good to me! Looking forward to it. Oh, and before I forget, have you heard about the new restaurant that just opened up? I've heard great things about their menu!",
  },
  {
    name: 'rose',
    message:
      "Yes, I've heard about it too! I've been wanting to try it out. Maybe we could go there for lunch after our project meeting tomorrow?",
  },
  {
    name: 'rose',
    message:
      "That's a fantastic idea! Let's do it. It'll be a nice way to unwind after a productive session. I'll check the menu and make a reservation for us.",
  },
  {
    name: 'rose',
    message:
      "Great, looking forward to it! I'll see you tomorrow then. Have a good rest of your day!",
  },
];
export {
  CHANNELS,
  EMPTY_BINDINGS_OBJECT,
  PAGES,
  PLACEHOLDERS,
  REGEX_STRINGS,
  INITIAL_KEYBINDS_CONTEXT_OBJECT,
  INITIAL_PROFILECREATIONBREAKER_CONTEXT_OBJECT,
  INITIAL_PROFILEINFO_CONTEXT_OBJECT,
  MESSAGES,
};

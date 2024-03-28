/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { CHANNELS, SOCKET_EVENTS } from '../objs';
import { dialog, app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
// import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { FileDialogObject, Message } from '../types';
import bcrypt from 'bcrypt';
const WebSocket = require('ws');
let ID: string = '';

const socket = new WebSocket('http://localhost:3000/connect');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on(CHANNELS.Logout, (event, arg) => {
  axios
    .post(
      `${arg.serverURL}${
        arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
      }logout`,
      {
        userid: arg.id,
      },
    )
    .then((response) => {
      event.reply(CHANNELS.Logout, {});
    });
});

ipcMain.on(CHANNELS.LoadKeyBinds, async (event, arg) => {
  let maxChars = 0,
    data = require('../../Configs/KeyBindings.json');
  for (const key in data) {
    if (data[key].keyCombination.length > maxChars) {
      maxChars = data[key].keyCombination.length;
    }
  }
  event.reply(CHANNELS.LoadKeyBinds, { maxChars: maxChars, keyBinds: data });
});

ipcMain.on(CHANNELS.FetchGroupData, (event, arg) => {
  axios
    .post(
      `${arg.serverURL}${
        arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
      }fetchgroupdata`,
      {
        userid: arg.id,
        groupid: arg.groupID,
      },
    )
    .then((response) => {
      event.reply(CHANNELS.FetchGroupData, response.data.data.members);
    });
});

socket.on('open', () => {
  socket.on('message', (data: any) => {
    let jsonData: { type: string; data: any } = JSON.parse(data);
    switch (jsonData.type) {
      case SOCKET_EVENTS.FETCH_CHATS:
        console.log('received new chats');
        mainWindow?.webContents.send(CHANNELS.FetchChatData, jsonData.data);
        break;
      case SOCKET_EVENTS.REFRESH:
        console.log('refresh command received->', {
          type: SOCKET_EVENTS.FETCH_CHATS,
          id1: jsonData.data.id1,
          id2: jsonData.data.id2,
        });
        socket.send(
          JSON.stringify({
            type: SOCKET_EVENTS.FETCH_CHATS,
            id1: jsonData.data.id1,
            id2: jsonData.data.id2,
          }),
        );
    }
  });
  ipcMain.on(CHANNELS.SendMessage, (event, arg) => {
    axios
      .post(
        `${arg.serverURL}${
          arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
        }sendmessage`,
        {
          message: arg.message,
          senderID: arg.senderID,
          receiverID: arg.receiverID,
          timestamp: arg.timestamp,
        },
      )
      .then((response) => {
        socket.send(
          JSON.stringify({
            type: SOCKET_EVENTS.SEND_CHAT,
            id1: arg.senderID,
            id2: arg.receiverID,
          }),
        );
        socket.send(
          JSON.stringify({
            type: SOCKET_EVENTS.FETCH_CHATS,
            id1: arg.senderID,
            id2: arg.receiverID,
          }),
        );
      });
  });

  ipcMain.on(CHANNELS.FetchID, (event, arg) => {
    ID = arg.id;
    socket.send(
      JSON.stringify({ type: SOCKET_EVENTS.REGISTER, id1: arg.id, id2: '' }),
    );
  });

  ipcMain.on(CHANNELS.TriggerChat, (event, arg) => {
    socket.send(
      JSON.stringify({
        type: SOCKET_EVENTS.FETCH_CHATS,
        id1: ID,
        id2: arg.receiverID,
      }),
    );
  });
});

ipcMain.on(CHANNELS.UpdateGroup, (event, arg) => {
  axios
    .post(
      `${arg.serverURL}${
        arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
      }updategroupdata`,
      {
        name: arg.name,
        userID: arg.userID,
        members: arg.members,
        groupID: arg.groupID,
      },
    )
    .then((groupResponse) => {
      if (groupResponse.data.status) {
        axios
          .post(
            `${arg.serverURL}${
              arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
            }fetchgroups`,
            {
              userID: arg.userID,
            },
          )
          .then((response) => {
            if (response.data.status) {
              event.reply(CHANNELS.FetchServerData, {
                data: response.data.data,
                type: 'Groups',
              });
            }
          });
      }
    });
});

ipcMain.on(CHANNELS.SelectProfilePicture, async (event, arg) => {
  dialog
    .showOpenDialog({ properties: ['openFile'] })
    .then((res: FileDialogObject) => {
      let sourceFilePath: string = res.filePaths[0];
      fs.readFile(sourceFilePath, (err, data: Buffer) => {
        if (err) throw err;
        let base64Image: string = Buffer.from(data).toString('base64');
        event.reply(CHANNELS.SelectProfilePicture, { data: base64Image });
      });
      /*exec(
        'copy ' + sourceFilePath + ' ' + destinationFilePath,
        (error, stdout, stdin) => {
          event.reply(CHANNELS.SelectProfilePicture, {
            path: destinationFilePath,
          });
        },
      );*/
    });
});

ipcMain.on(CHANNELS.Signup, (event, arg) => {
  bcrypt.hash(arg.password, 10, (err, hash) => {
    axios
      .post(
        `${arg.serverURL}${
          arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
        }usersignup`,
        {
          name: arg.name,
          email: arg.email,
          password: hash,
          pictureData: arg.pictureData,
          online: true,
        },
      )
      .then((response) => {
        if (!response.data.status) {
          event.reply(CHANNELS.Signup, {
            valid: false,
            message: response.data.message,
          });
        } else {
          event.reply(CHANNELS.Signup, {
            valid: true,
            data: { id: response.data.data.id },
          });
        }
      });
  });
});

ipcMain.on(CHANNELS.SaveUIState, (event, arg) => {
  var filePath = process.cwd() + '\\src\\UserFiles\\UIState.json';
});

ipcMain.on(CHANNELS.VerifyLogin, (event, arg) => {
  axios
    .post(
      `${arg.serverURL}${
        arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
      }login`,
      {
        email: arg.email,
        password: arg.password,
      },
    )
    .then((response) => {
      if (!response.data.status) {
        event.reply(CHANNELS.VerifyLogin, {
          valid: false,
          message: 'Wrong Login Details',
        });
      } else {
        event.reply(CHANNELS.VerifyLogin, {
          data: response.data.data,
          valid: true,
        });
      }
    })
    .catch((err) => {
      event.reply(CHANNELS.VerifyLogin, {
        valid: false,
        message: "Couldn't Connect to Server",
      });
    });
});

ipcMain.on(CHANNELS.FetchServerData, (event, arg) => {
  axios
    .post(
      `${arg.serverURL}${
        arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
      }${arg.type == 'Groups' ? 'fetchgroups' : 'fetchusers'}`,
      {
        userID: arg.id,
      },
    )
    .then((response) => {
      if (response.data.status) {
        event.reply(CHANNELS.FetchServerData, {
          data: response.data.data,
          type: arg.type,
        });
      }
    });
});

ipcMain.on(CHANNELS.DeleteGroup, (event, arg) => {
  axios
    .post(
      `${arg.serverURL}${
        arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
      }deletegroup`,
      {
        userID: arg.id,
        groupID: arg.groupID,
      },
    )
    .then((response) => {
      if (response.data.status) {
        axios
          .post(
            `${arg.serverURL}${
              arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
            }fetchgroups`,
            {
              userID: arg.id,
            },
          )
          .then((response) => {
            if (response.data.status) {
              event.reply(CHANNELS.FetchServerData, {
                data: response.data.data,
                type: 'Groups',
              });
            }
          });
      }
    });
});

ipcMain.on(CHANNELS.AddGroup, (event, arg) => {
  axios
    .post(
      `${arg.serverURL}${
        arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
      }creategroup`,
      {
        userID: arg.id,
        groupName: arg.name,
        members: arg.members,
      },
    )
    .then((response) => {
      if (response.data.status) {
        axios
          .post(
            `${arg.serverURL}${
              arg.serverURL[arg.serverURL.length - 1] == '/' ? '' : '/'
            }fetchgroups`,
            {
              userID: arg.id,
            },
          )
          .then((response) => {
            if (response.data.status) {
              event.reply(CHANNELS.FetchServerData, {
                data: response.data.data,
                type: 'Groups',
              });
            }
          });
      }
    });
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)',
      symbolColor: '#989898',
      height: 30,
    },
    autoHideMenuBar: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

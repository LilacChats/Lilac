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
import { CHANNELS } from '../objs';
import { dialog, app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
// import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { FileDialogObject } from '../types';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on(CHANNELS.LoadKeyBinds, async (event, arg: {}) => {
  let maxChars = 0,
    data = require('../../Configs/KeyBindings.json');
  for (const key in data) {
    if (data[key].keyCombination.length > maxChars) {
      maxChars = data[key].keyCombination.length;
    }
  }
  event.reply(CHANNELS.LoadKeyBinds, { maxChars: maxChars, keyBinds: data });
});

ipcMain.on(CHANNELS.SelectProfilePicture, async (event, arg: {}) => {
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

ipcMain.on(CHANNELS.SaveUIState, (event, arg) => {
  filePath = process.cwd() + '\\src\\UserFiles\\UIState.json';
});

ipcMain.on(CHANNELS.VerifyLogin, (event, arg) => {
  // setTimeout(() => {
  event.reply(CHANNELS.VerifyLogin, { valid: true });
  // }, 5000);
});

ipcMain.on(CHANNELS.FetchServerData, (event, arg) => {
  setTimeout(() => {
    event.reply(CHANNELS.FetchServerData, {});
  }, 5000);
});

// function fileExistsSync(filePath: string): boolean {
//   try {
//     fs.accessSync(filePath, fs.constants.F_OK);
//     return true;
//   } catch (err) {
//     return false;
//   }
// }

// ipcMain.on(CHANNELS.Override_INSECURE, async (event, arg: any) => {
//   if (fileExistsSync(process.cwd() + '\\src\\UserFiles\\AccountData.json')) {
//     var response = dialog.showMessageBoxSync(
//       mainWindow ? mainWindow : new BrowserWindow({ width: 500, height: 200 }),
//       {
//         noLink: true,
//         type: 'warning',
//         message: 'ACCOUNT INFORMATION FOUND!\n\n\nEngage INSECURE OVERRIDE?',
//         buttons: ['Confirm', 'Deny'],
//         title: 'INSECURE OVERRIDE TRIGGERED',
//       },
//     );
//     if (response == 0) {
//       let profileData = require(
//         process.cwd() + '\\src\\UserFiles\\AccountData.json',
//       );
//       event.reply(CHANNELS.Override_INSECURE, {
//         override: true,
//         data: profileData,
//       });
//     } else {
//       process.exit(1);
//     }
//   } else {
//     event.reply(CHANNELS.Override_INSECURE, {
//       override: false,
//       data: null,
//     });
//   }
// });

// ipcMain.on(CHANNELS.VerifyLogin, async (event, arg) => {
//   let profileData = require(
//     process.cwd() + '\\src\\UserFiles\\AccountData.json',
//   );
//   event.reply(CHANNELS.VerifyLogin, {
//     validationObject: {
//       emailValid: arg.email == profileData.email ? true : false,
//       passwordValid: arg.password == profileData.password ? true : false,
//     },
//     data:
//       arg.email == profileData.email && arg.password == profileData.password
//         ? profileData
//         : {},
//   });
// });

// ipcMain.on(
//   CHANNELS.SaveProfileData,
//   async (event, arg: Signup_Request_Object) => {
//     console.log(arg);
//     fs.writeFile(
//       process.cwd() + '\\src\\UserFiles\\AccountData.json',
//       JSON.stringify(arg, null, 2),
//       (err) => {
//         //handle error here
//       },
//     );
//     axios.post(arg.serverURL, arg).then((res) => {
//       event.reply(CHANNELS.SaveProfileData, { id: res.data.id });
//     });
//   },
// );

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
      color: 'rgb(207,207,207)',
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

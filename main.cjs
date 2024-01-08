const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { createApplicationWindow } = require('./main/process.cjs');
const { createSplashWindow,  generateDeviceFingerprint} = require('./main/splash.cjs');
// import { fileURLToPath } from 'url';
// import { join, dirname } from 'node:path';

let verified = false;
let splashWindowId = 0;
let mainWindowId = 0;

app.whenReady().then(() => {
  
  ipcMain.on("close-app", (event)=>{
    app.quit();
  });

  ipcMain.on("minimize-app", (event)=>{
    const window = BrowserWindow.fromId(mainWindowId);
    if(window !== null){
      window.minimize();
    }
  });

  ipcMain.handle('get-fingerprint', generateDeviceFingerprint);

  ipcMain.on("verified", (event)=>{
    const window = BrowserWindow.fromId(splashWindowId);
    if(window !== null){
      window.close()
    }else{
      console.log("ouchh", window)
    }
    mainWindowId = createApplicationWindow();
  });

  ipcMain.on("set-verification", (event, state)=>{
    if(typeof state === 'boolean'){
      verified = state;
    }
  });

  ipcMain.handle("get-verification", (event)=>{
    return verified;
  })

  // createApplicationWindow();
  splashWindowId = createSplashWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      splashWindowId = createSplashWindow();
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

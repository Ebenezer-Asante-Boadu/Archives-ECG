import { app, BrowserWindow, ipcMain, screen } from 'electron';
// import { fileURLToPath } from 'url';
// import { join, dirname } from 'node:path';
import { createApplicationWindow, applicationWindow } from './main/process.js';
import { createSplashWindow, splashWindow, generateDeviceFingerprint } from './main/splash.js';

let verified = false;

app.whenReady().then(() => {
  
  ipcMain.on("close-app", (event)=>{
    app.quit();
  });

  ipcMain.handle('get-fingerprint', generateDeviceFingerprint);

  ipcMain.on("verified", (event)=>{
    splashWindow.close();
    createApplicationWindow();
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
  createSplashWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createSplashWindow();
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

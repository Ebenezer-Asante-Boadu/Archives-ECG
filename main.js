import { app, BrowserWindow, ipcMain } from 'electron';
// import { fileURLToPath } from 'url';
// import { join, dirname } from 'node:path';
import { createApplicationWindow, applicationWindow } from './main/process.js';
import { createSplashWindow, splashWindow } from './main/splash.js';


app.whenReady().then(() => {
  
  ipcMain.on("close-app", (event)=>{
    app.quit();
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

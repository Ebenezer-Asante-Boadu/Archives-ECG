import { app, BrowserWindow, ipcMain } from 'electron';
// import { fileURLToPath } from 'url';
// import { join, dirname } from 'node:path';
import { createApplicationWindow, applicationWindow } from './main-files/main/main-process.js';
import { createSplashWindow, splashWindow } from './main-files/splash/splash-process.js';


app.whenReady().then(() => {
  
  ipcMain.on("close-app", (event)=>{
    app.quit();
  })

  createSplashWindow();
  setTimeout(function () {
    splashWindow.close();
    createApplicationWindow();
  }, 500000);

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

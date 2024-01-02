import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { join, dirname } from 'node:path';

const createWindow = () => {
  // Convert the import.meta.url to a file path
  const __filename = fileURLToPath(import.meta.url);

  // Get the directory name
  const __dirname = dirname(__filename);

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('dist/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


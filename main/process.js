import {  BrowserWindow, app} from 'electron';
import { fileURLToPath } from 'url';
import { join, dirname } from 'node:path';
import path from 'path';

export let applicationWindow;

export const createApplicationWindow = () => {
    // Convert the import.meta.url to a file path
    const __filename = fileURLToPath(import.meta.url);
  
    // Get the directory name
    const __dirname = dirname(__filename);
  
    // Create the browser window.
    applicationWindow = new BrowserWindow({
      backgroundColor: "white",
      width: 800,
      height: 600,
      frame: false,
      minHeight: 400,
      minWidth: 600,
      roundedCorners: false,
      transparent:true,
      webPreferences: {
        sandbox: true,
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, "preloads" ,'main-preload.js'),
        devTools: true
      },
    });
  
    // and load the index.html of the app.
    applicationWindow.loadFile(path.join(__dirname, "..", "dist", 'index.html'));
  
    // applicationWindow.loadURL('http://localhost:5173');
    applicationWindow.webContents.openDevTools();
  
  };
  
  
  
  
  

  
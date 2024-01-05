import {  BrowserWindow, app} from 'electron';
import { fileURLToPath } from 'url';
import { join, dirname } from 'node:path';
import { createMenu } from './main-menu.js';
import path from 'path';

export let applicationWindow;

export const createApplicationWindow = () => {
    // Convert the import.meta.url to a file path
    const __filename = fileURLToPath(import.meta.url);
  
    // Get the directory name
    const __dirname = dirname(__filename);
  
    // Create the browser window.
    applicationWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      minHeight: 400,
      minWidth: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, 'main-preload.js'),
      },
    });
  
    // and load the index.html of the app.
    applicationWindow.loadFile(path.join(__dirname, "..", "..", 'dist/index.html'));
  
    // applicationWindow.loadURL('http://localhost:5173');
    applicationWindow.webContents.openDevTools();
    createMenu();
  
  };
  
  
  
  
  

  
import { app, BrowserWindow, Menu } from 'electron';
import { fileURLToPath } from 'url';
import { join, dirname } from 'node:path';
import path from 'path';

export let splashWindow;

export function createSplashWindow() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    splashWindow = new BrowserWindow({
        //    backgroundColor: "linear-gradient(119deg, #D9D9D9 17.7%, rgba(137, 136, 176, 0.00) 96.71%);",
        backgroundColor: 'white',
        hasShadow: true,
        width: 400,
        minWidth: 400,
        maxWidth: 400,
        height: 270,
        minHeight: 270,
        maxHeight: 270,
        transparent: true,
        frame: false,
        transparent: true,
        alwaysOnTop: true, 
        webPreferences:{
            preload: path.join(__dirname, "preloads", "verify.js"), 
            devTools: true
        }
    });

 
    // splashWindow.loadFile(path.join(__dirname, "splash.html"));
    splashWindow.loadURL("http://localhost:5173");
    splashWindow.center();
}
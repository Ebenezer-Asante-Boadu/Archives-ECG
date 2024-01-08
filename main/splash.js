import { app, BrowserWindow, Menu, screen } from 'electron';
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
          sandbox:true,
            preload: path.join(__dirname, "preloads", "verify.js"), 
            devTools: true
        }
    });

 
    splashWindow.loadFile(path.join(__dirname, "..", "dist" ,"index.html"));
    // splashWindow.loadFile("../dist/index.html")
    // splashWindow.loadURL("http://localhost:5173/#/");
    splashWindow.center();

  
    
}



export function generateDeviceFingerprint(event,userAgent) {
// console.log(userAgent)
    try {
      // Get Electron version
      const electronVersion = process.versions.electron;
  
      // Get platform information
      const platform = process.platform;
      const arch = process.arch;
  
      // Get screen dimensions
      const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
  
    //   // Get other relevant information
    //   const userAgent = navigator.userAgent;
  
      // Create a fingerprint using relevant information
      const fingerprint = `${electronVersion}${platform}${arch}${width}${height}${userAgent}`;
  
      return fingerprint;
    } catch (error) {
      console.error('Error generating device fingerprint:', error);
      return null; // or handle the error in an appropriate way
    }
  }
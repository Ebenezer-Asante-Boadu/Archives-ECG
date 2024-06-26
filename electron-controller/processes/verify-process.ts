import { BrowserWindow, app, screen } from "electron";
import path from "path";

export function createSplashWindow() {

  const splashWindow = new BrowserWindow({
    //    backgroundColor: "linear-gradient(119deg, #D9D9D9 17.7%, rgba(137, 136, 176, 0.00) 96.71%);",
    backgroundColor: 'white',
    hasShadow: true,
    width: 400,
    minWidth: 400,
    maxWidth: 400,
    height: 245,
    minHeight: 245,
    maxHeight: 245,
    transparent: true,
    titleBarStyle: "hidden",
    frame: true,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      sandbox: true,
      preload: path.join(__dirname, "..", "preloads", "verify-preload.js"),
      devTools: true
    }
  });


  if (process.env.ENV === 'DEVELOPMENT') {
    splashWindow.loadURL("http://localhost:5173");
  } else {
    splashWindow.loadFile(path.join(__dirname, "..", "..", "..", "dist", "index.html"));
  }

  //  
  splashWindow.center();

  return splashWindow.id;
}


export function generateDeviceFingerprint(event: any, userAgent: string) {
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

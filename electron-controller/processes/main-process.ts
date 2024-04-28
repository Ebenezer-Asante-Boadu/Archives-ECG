import { BrowserWindow, app, screen, nativeTheme } from "electron";
import path from "path";

export function createApplicationWindow(){
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
    // Create the browser window.
    const applicationWindow = new BrowserWindow({
      backgroundColor: "white",
      width: width-850 > 595 ? width-850: 595,
      height: height-300 > 500? height-300: 500,
      resizable:false,
      titleBarStyle: 'hidden',
      frame: true,
      roundedCorners: false,
      transparent:true,
      center: true,
      webPreferences: {
        sandbox: true,
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "..", "preloads" ,'main-preload.js'),
        devTools: true
      },
    });


    // applicationWindow.setMenuBarVisibility(false)
//   applicationWindow.webContents.
    // and load the index.html of the app.
    if(process.env.ENV === 'DEVELOPMENT'){
      applicationWindow.loadURL('http://localhost:5173');
    }else{
      applicationWindow.loadFile(path.join(__dirname, "..", "..", "..",  "dist", 'index.html'));
    }
    
  
    // 
    // applicationWindow.webContents.openDevTools();

  
    try{
      applicationWindow.webContents.executeJavaScript(
        `localStorage.setItem("dark_mode", ${nativeTheme.shouldUseDarkColors});  window.dispatchEvent(new Event('storage'));`
        , true);
    }catch(err){
      console.log(err)
    }
    
  
    return applicationWindow.id;
  };
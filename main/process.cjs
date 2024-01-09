
const {  BrowserWindow, app, screen} = require('electron');
const { fileURLToPath } = require('url');
const { join, dirname } = require('node:path');
const path = require('path');
const url = require("url")

 let applicationWindow;

 function createApplicationWindow(){
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
    // Create the browser window.
    applicationWindow = new BrowserWindow({
      backgroundColor: "white",
      width: width-700 >= 750 ? width-700: 750,
      height: height-300 >= 500? height-300: 500,
      resizable:false,
      frame: false,
      roundedCorners: false,
      transparent:true,
      center: true,
      webPreferences: {
        sandbox: true,
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preloads" ,'main-preload.js'),
        devTools: true
      },
    });


  
    // and load the index.html of the app.
    applicationWindow.loadFile(path.join(__dirname, "..", "dist", 'index.html'));
  
    // applicationWindow.loadURL('http://localhost:5174');
    // applicationWindow.webContents.openDevTools();
  
    return applicationWindow.id;
  };
  
  module.exports = {createApplicationWindow};
  
  
  

  
import { BrowserWindow, ipcMain, app, screen, nativeTheme } from "electron";
import { createApplicationWindow } from "./processes/main-process";
import { createSplashWindow, generateDeviceFingerprint } from "./processes/verify-process";
import { encryptAndSaveData, readAndDecryptData } from "./lib/user";
import { isPastSevenDays, isUserDataAvailableAndValid } from "./utils/userUtils";
import { addRequest } from "./lib/firebase";
import type { UserRequest } from "./types";
import { saveWorkbook } from "./utils/fileUtils";
import dotenv from "dotenv";

dotenv.config();

let userinfo: UserRequest | undefined;
let splashWindowId = 0;
let mainWindowId = 0;
let authenticated = false;

function getAuth() {
  console.log("from function", authenticated)
  return authenticated;
}


app.whenReady().then(() => {
  
console.log(process.env.ENV)
  
  ipcMain.on("close-app", (event) => {
    app.quit();
  });

  // if(!event){
  //   const event = new CustomEvent("theme-change", {detail:{darkMode:${nativeTheme.shouldUseDarkColors}}}); 
  //   document.dispatchEvent(event)
  // }else{
  //   event = new CustomEvent("theme-change", {detail:{darkMode:${nativeTheme.shouldUseDarkColors}}}); 
  //   document.dispatchEvent(event)
  // }

  nativeTheme.on("updated",()=>{
    const window = BrowserWindow.fromId(mainWindowId);
    if(window){
      window.webContents.executeJavaScript(
        `localStorage.setItem("dark_mode", ${nativeTheme.shouldUseDarkColors});  window.dispatchEvent(new Event('storage'));`
        , true);
    };
  })

  ipcMain.on("minimize-app", (event) => {
    const window = BrowserWindow.fromId(mainWindowId);
    if (window !== null) {
      window.minimize();
    }
  });

  ipcMain.on("minimize-restore", () => {
    try {
      const window = BrowserWindow.fromId(mainWindowId);
      if (window) {
        if (window.isMaximized()) {
          const screenWidth = screen.getPrimaryDisplay().workAreaSize;
          window.setSize(Math.floor(0.65 * screenWidth.width), Math.floor(0.75 * screenWidth.height), true);
          window.center()
        } else {
          window.maximize();
        }
      }
    } catch (err) {
      console.log(err)
    }
  })

  ipcMain.on("reset-default", (event) => {
    const window = BrowserWindow.fromId(mainWindowId);

    if (window) {
      const screenWidth = screen.getPrimaryDisplay().workAreaSize;
      window.setSize(screenWidth.width, screenWidth.height, true); // Set width to full screen width
      window.setResizable(true);
      window.setMinimumSize(
        screenWidth.width - 700 >= 750 ? screenWidth.width - 700 : 750,
        screenWidth.height - 300 >= 500 ? screenWidth.height - 300 : 500
      ); // Set minimum width
      window.setMaximumSize(screenWidth.width, screenWidth.height); // Set maximum width
      window.center();
      // window.setMenuBarVisibility(true)
    }
  })

  ipcMain.handle('get-fingerprint', generateDeviceFingerprint);

  ipcMain.handle("verify-app", async (event, data) => {
    userinfo = undefined;
    let returnValue = { success: false, message: 1000 };
    const { staff_id, fingerprint, date } = data;
    // console.log("called")

    const already = isUserDataAvailableAndValid(staff_id);
    console.log("from already", already)
    if (already.success && already.value.verified) {
      console.log("pana")
      returnValue.success = true;
      userinfo = already.value;
      const window = BrowserWindow.fromId(splashWindowId);
      if (window !== null) {
        window.close();
      } else {
        returnValue = { success: false, message: 1000 };
      }
      mainWindowId = createApplicationWindow();

    } else if (already.message === 5000) {
      returnValue.message = 5000;
    } else {
      try {
        console.log("from")
        const sendData = await addRequest(fingerprint, staff_id);
        console.log("addRequest information", sendData)
        if (sendData) {
          userinfo = sendData;
          console.log("send data from:", sendData.fingerprint, sendData.date, sendData.staff_id)
          const encryptedData = encryptAndSaveData(sendData.fingerprint, (sendData.date as any).toDate(), sendData.staff_id);
          if (encryptedData) {
            console.log("not passed", (sendData.date as any).toDate());
            if (!isPastSevenDays((sendData.date as any).toDate()) && sendData.verified) {
              console.log("mrfvni")
              returnValue = { success: true, message: 1000 };
              const window = BrowserWindow.fromId(splashWindowId);
              if (window !== null) {
                window.close();
              } else {
                returnValue = { success: false, message: 1000 };
              }
              mainWindowId = createApplicationWindow();
            }
          } else {
            returnValue = { success: false, message: 1000 };
          }
        }
      } catch (error: any) {
        console.log("Error in verify-app:", error.message);
        returnValue = { success: false, message: 1000 };
      }
    }
    return returnValue;
  });



  ipcMain.handle("get-verification", (event) => {
    let returnValue = false;
    console.log(userinfo?.date)
    if (userinfo && !isPastSevenDays((userinfo.date as any).toDate())) {
      console.log("yeahma")
      returnValue = true;
    }

    return returnValue;
  });


  ipcMain.handle("get-userDetails", () => {
    if (userinfo) {
      return { status: userinfo.status, staff_id: userinfo.staff_id }
    }
    return null;
  });

  ipcMain.handle("export", async (event, data:Array<Array<string>>)=>{
    try{
      console.log(56)
      const res = await saveWorkbook();
    }catch(err){
      console.log(err)
    }
  })


  ipcMain.on("set-authenticated", (ecent, auth: boolean) => {
    authenticated = auth;
  });

  ipcMain.handle("get-authenticated", async () => {
    console.log("didn't work", authenticated)
    console.log("done", getAuth())
    return getAuth();
  });

  // createApplicationWindow();
  splashWindowId = createSplashWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      splashWindowId = createSplashWindow();
    }
  });

});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
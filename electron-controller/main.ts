import { BrowserWindow, ipcMain, app, screen } from "electron";
import { createApplicationWindow } from "./processes/main-process";
import { createSplashWindow, generateDeviceFingerprint } from "./processes/verify-process";
import { encryptAndSaveData, readAndDecryptData } from "./lib/user";
import { isPastSevenDays, isUserDataAvailableAndValid } from "./utils/userUtils";
import { addRequest } from "./lib/firebase";
import type { UserRequest } from "./types";


let userinfo: UserRequest | undefined;
let splashWindowId = 0;
let mainWindowId = 0;



app.whenReady().then(() => {

  // encryptAndSaveData("how are you");
  // console.log(readAndDecryptData());
  ipcMain.on("close-app", (event) => {
    app.quit();
  });

  ipcMain.on("minimize-app", (event) => {
    const window = BrowserWindow.fromId(mainWindowId);
    if (window !== null) {
      window.minimize();
    }
  });

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

//     const already = isUserDataAvailableAndValid(staff_id);
// console.log("userinfo here", userinfo)
//     if (userinfo) {
//       if (!isPastSevenDays(userinfo.date)) {
//         console.log("yeah")

//         returnValue = true;
//       }
//     } else {
//       if (already.success) {
//         const res = readAndDecryptData(staff_id);
//         if (res && res !== 5000) {
//           userinfo = res;
console.log(userinfo?.date)
          if (userinfo && !isPastSevenDays((userinfo.date as any).toDate())) {
            console.log("yeahma")
            returnValue = true;
          }
      //   }
      // }
    // }

    return returnValue;
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
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { createApplicationWindow } = require('./main/process.cjs');
const { createSplashWindow, generateDeviceFingerprint } = require('./main/splash.cjs');
const { encryptAndSaveData, readAndDecryptData } = require("./main/management/user.cjs")
const { isPastSevenDays, isUserDataAvailableAndValid } = require("./main/lib.cjs");
const { addRequest } = require("./main/management/firebase.cjs")


let userinfo;
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
    console.log("from already",already)
    if (already.success) {
      console.log("pana")
      returnValue.success = true;
      userinfo = already.value;
    } else if (already.message === 5000) {
      returnValue.message = 5000;
    } else {
      try {
        console.log("from")
        const sendData = await addRequest(fingerprint, staff_id);
        console.log(sendData)
        if (sendData) {
          const encryptedData = encryptAndSaveData(sendData.fingerprint, sendData.date, sendData.staff_id);
          if (encryptedData) { console.log("not passed", sendData.date.toDate())
            if (!isPastSevenDays(sendData.date)) { console.log("mrfvni")
              returnValue = { success: true };
              const window = BrowserWindow.fromId(splashWindowId);
              if (window !== null) {
                window.close();
              } else {
                returnValue = { success: false, message: "Unable to close splash window" };
              }
              mainWindowId = createApplicationWindow();
            }
          } else {
            returnValue = { success: false, message: "Unable to encrypt and save data" };
          }
        }
      } catch (error) {
        console.log("Error in verify-app:", error.message);
        returnValue = { success: false, message: 1000 };
      }
    }
    return returnValue;
  });



  ipcMain.handle("get-verification", (event, staff_id) => {
    let returnValue = false;

    const already = isUserDataAvailableAndValid(staff_id);

    if (userinfo) {
      if (!isPastSevenDays(userinfo.date)) {
        console.log("yeah")

        returnValue = true;
      }
    } else {
      if (already.succes) {
        const res = readAndDecryptData(staff_id);
        if (res) {
          userinfo = res;
          if (!isPastSevenDays(userinfo.date)) {
            console.log("yeahma")
            returnValue = true;
          }
        }
      }
    }

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

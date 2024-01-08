
const { contextBridge, ipcRenderer } = require('electron/renderer');



contextBridge.exposeInMainWorld('verify', {
  close: () => {
    try {
      ipcRenderer.send('close-app');
    } catch (error) {
      console.error('Error sending close-app IPC message:', error);
    }
  },
  fingerprint: async () => {
    try {
      const fingerprint = await ipcRenderer.invoke('get-fingerprint', navigator.userAgent);
      return fingerprint;
    } catch (error) {
      console.error('Error getting device fingerprint:', error);
      return null; // or handle the error in an appropriate way
    }
  },
  verified: () => {
    try {
      ipcRenderer.send("verified")
    } catch (err) {
      console.log(error)
    }
  },
  setVerification: (state) =>{
    try{
      ipcRenderer.send("set-verification", state);
    }catch(err){
      console.log(err)
    }
  },
  getVerification: async ()=>{
    try{
      const response = await ipcRenderer.invoke("get-verification");
      return response;
    }catch(err){
      console.log(err)
    }
  }
});



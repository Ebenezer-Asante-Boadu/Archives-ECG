const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld("main", {
  getVerification: async () => {
    // console.log("working")
    try {
      const response = await ipcRenderer.invoke("get-verification");
      return response;
    } catch (err) {
      console.log(err)
    }
  },
  close: () => {
    try {
      ipcRenderer.send('close-app');
    } catch (error) {
      console.error('Error sending close-app IPC message:', error);
    }
  },
  minimize: () => {
    try {
      ipcRenderer.send('minimize-app');
    } catch (error) {
      console.error('Error sending minimize-app IPC message:', error);
    }
  },
})
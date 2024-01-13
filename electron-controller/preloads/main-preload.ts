import { contextBridge, ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld("main", {
    getVerification: async ()=>{
      try{
        const response = await ipcRenderer.invoke("get-verification");
        return response;
      }catch(err){
        return false;
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
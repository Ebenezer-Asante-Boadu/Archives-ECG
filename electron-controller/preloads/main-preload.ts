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
    maximizeRestore: ()=>{
      try{
        ipcRenderer.send("minimize-restore");
      }catch(err){
        console.log(err)
      }
    },
    getUserDetails: async()=>{
      try{
        const response = await ipcRenderer.invoke("get-userDetails");
        return response;
      }catch(err){
        return null;
      }
    },
    resetDefault: ()=>{
      try{
        ipcRenderer.send("reset-default");
      }catch(err){
        console.log(err)
      }
    },
    setAuthenticated: ()=>{
      try{
        ipcRenderer.send("set-authenticated");
      }catch(err){
        console.log(err)
      }
    },
    getAuthenticated: async()=>{
      try{
        const response = await ipcRenderer.invoke("get-authenticated");
        return response;
      }catch(err){
        return null
        console.log(err)
      }
    },
    exportExcel: async(data:Array<Array<string>>)=>{
      console.log("from preload")
      try{
        const res = await ipcRenderer.invoke("export", data);
        console.log(res)
        return res;
      }catch (err){
        console.log(err)
        return null
      }
    },
    showNotification: (message:string, email:string)=>{
      try{
        const res = ipcRenderer.send("show-notification", message, email);
      }catch(err){
        console.log(err)
      }
    },
    openFileDialog: async()=>{
      try{
        const res = await ipcRenderer.invoke("open-file-dialog");
        return res;
      }catch(err){
        return null;
      }
    }
  })
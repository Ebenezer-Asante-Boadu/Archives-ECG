const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld("main",{
    getVerification: async ()=>{
        // console.log("working")
        try{
          const response = await ipcRenderer.invoke("get-verification");
          return response;
        }catch(err){
          console.log(err)
        }
      }
})
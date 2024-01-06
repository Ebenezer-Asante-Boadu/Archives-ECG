const { contextBridge, ipcRenderer } = require('electron/renderer');


    contextBridge.exposeInMainWorld('verify', {
        close: () => ipcRenderer.send('close-app')
      });




  
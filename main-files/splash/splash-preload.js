const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('api', {
  close: () => ipcRenderer.send('close-app')
})

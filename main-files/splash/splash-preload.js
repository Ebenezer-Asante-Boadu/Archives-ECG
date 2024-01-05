const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('api', {
  // close: () => ipcRenderer.send('close-app')
});

document.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.getElementById("close-app");
  const cancelBtn = document.getElementById("cancel")

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      ipcRenderer.send('close-app');
    });
  }

  if(cancelBtn){
    cancelBtn.addEventListener("click", ()=>{
      ipcRenderer.send("close-app")
    })
  }
});

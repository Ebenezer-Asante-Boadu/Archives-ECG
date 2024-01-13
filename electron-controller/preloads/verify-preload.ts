import { contextBridge, ipcRenderer } from "electron/renderer";
import { UserRequest } from "../types";

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
        return false; // or handle the error in an appropriate way
      }
    },
    getVerification: async ()=>{
      try{
        const response = await ipcRenderer.invoke("get-verification");
        return response;
      }catch(err){
        return false;
      }
    },
    verifyApp: async ({fingerprint, date, staff_id}:UserRequest)=>{
      try{
        const response = await ipcRenderer.invoke("verify-app", {fingerprint, date, staff_id});
        console.log("preload", response)
        return response;
      }catch(err){
        return {success: false, message:1000};
      }
    }
  });
import { ref, computed, watchEffect, onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia';
import {setAuthenticated, getAuthenticated} from "../lib/utils";
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { startFirebaseApp } from '@/lib/firebase';

export const useAppDetails = defineStore('app-main', () => {
  startFirebaseApp();
  const auth = getAuth();
  const authenticated = ref(false);
  const systemColor = ref("red-blackk");
  const darkmode = ref(localStorage.getItem("dark_mode") === "true" ? true: false);

console.log(localStorage.getItem("dark_mode"), darkmode.value)
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setAuthentication(!!user);
    console.log(authenticated.value)
  });

  onBeforeUnmount(() => {
    // Unsubscribe from onAuthStateChanged when the component is unmounted
    unsubscribe();
  });


  window.addEventListener("storage",()=>{
    darkmode.value = localStorage.getItem("dark_mode") === "true" ? true: false;
  });

  
  function setAuthentication(state:boolean){
    authenticated.value = state;
  }

  return {
    darkmode,
    authenticated,
    setAuthentication,
    systemColor
  }
})

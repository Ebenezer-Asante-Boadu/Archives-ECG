import { ref, computed, watchEffect, onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia';
import {setAuthenticated, getAuthenticated} from "../lib/utils";
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { startFirebaseApp } from '@/lib/firebase_user_service';
import router from '@/router';
import { getUserDetails } from '../lib/utils';

export const useAppDetails = defineStore('app-main',  () => {
  startFirebaseApp();
  
  
  const userDetails = ref({
    id: "" ,
    name: "",
    email: "",
    phone: ""
  })
  const auth = getAuth();
  const authenticated = ref(false);
  const systemColor = ref("red-blackk");
  // const darkmode = ref(localStorage.getItem("dark_mode") === "true" ? true: false);
  const darkmode = ref(true);
  const shouldShowBackArrow = ref(false);

// console.log(localStorage.getItem("dark_mode"), darkmode.value)
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setAuthentication(!!user);
    userDetails.value.email = user?.email || "";
    userDetails.value.name = user?.displayName || "";
    userDetails.value.phone = user?.phoneNumber || "";
    console.log(user)
  });

  watchEffect(async ()=>{
    console.log("watcheffecr", router.currentRoute.value.meta.admin)
    if(router.currentRoute.value.meta.backArrow){
      shouldShowBackArrow.value = true;
    }else{
      shouldShowBackArrow.value = false;
    }
    const details =  await getUserDetails();
    userDetails.value.id = details?.staff_id || "";
  })
  onBeforeUnmount(() => {
    // Unsubscribe from onAuthStateChanged when the component is unmounted
    unsubscribe();
  });


  // window.addEventListener("storage",()=>{
  //   darkmode.value = localStorage.getItem("dark_mode") === "true" ? true: false;
  // });

  
  function setAuthentication(state:boolean){
    authenticated.value = state;
  }

  function setShouldShowBackArrow(state: boolean){
    shouldShowBackArrow.value = state;
  }

  function setEmail(email:string){
    if(email.length > 2){
      userDetails.value.email = email;
    }
  }
  return {
    darkmode,
    authenticated,
    setAuthentication,
    systemColor,
    shouldShowBackArrow,
    userDetails,
    setShouldShowBackArrow,
    setEmail
  }
})

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6LsDYKUv3F8KaL38da6CqKJY2k6w8rP0",
  authDomain: "ecg-archives.firebaseapp.com",
  projectId: "ecg-archives",
  storageBucket: "ecg-archives.appspot.com",
  messagingSenderId: "280643417076",
  appId: "1:280643417076:web:b69bf0c53fccf1eecc7fa1",
  measurementId: "G-650FJKVWPM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
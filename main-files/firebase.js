// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore ,  collection, addDoc, serverTimestamp} from "firebase/firestore";
import type { UserRequest } from "./types";

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
const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);

export async function addRequest(request: Omit<UserRequest, 'date'>): Promise<boolean> {
  try {
    // Add the document to the "requests" collection with server timestamp
    await addDoc(collection(db, 'requests'), {
      ...request,
      date: serverTimestamp(),
    });
    console.log('Document successfully added!');
    return true;
  } catch (error) {
    console.error('Error adding document: ', error);
    return false;
  }
}
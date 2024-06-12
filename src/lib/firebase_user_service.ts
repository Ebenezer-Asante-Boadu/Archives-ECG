
import { initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator, getFirestore, collection, addDoc, updateDoc,
  serverTimestamp, doc, setDoc, getDoc, getDocs, query, limit, where,
} from "firebase/firestore";

import type { UserRequest, User, FirebaseUser } from "./types";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"

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
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
//connectFirestoreEmulator(db, '127.0.0.1', 8080);

export function startFirebaseApp() {
  initializeApp(firebaseConfig)
}

export async function _signInWithEmailPassword(
  email: string,
  password: string,
  staff_id: string,
  callback: (message: string) => void
) {
  const auth = getAuth();
  const firestore = getFirestore();

  try {
      // Check if a document with the given email and staff_id exists in the "users" collection
      const usersCollection = collection(firestore, 'users');
      const usersQuery = query(usersCollection, where('email', '==', email), where('staff_id', '==', staff_id));
      const userDocs = await getDocs(usersQuery);

      if (userDocs.empty) {
          // No user found with the provided email and staff_id
          // Callback with unauthorized access message
          callback("Unauthorized access");
          return {
              success: false,
              error: {
                  message: 'Unauthorized access',
              },
          };
      } else {
          // User found with matching email and staff_id, proceed with signing in
          const user = userDocs.docs[0].data() as FirebaseUser;
          callback("Signing in...");
          try {
              await signInWithEmailAndPassword(auth, email, password);
              return {
                  success: true,
                  message: 'Successfully signed in',
                  user: { email: user.email, status: user.status },
              };
          } catch (signInError: any) {
              // Handle sign-in errors
              let errorMessage = 'Error signing in';
              switch (signInError.code) {
                  case 'auth/user-not-found':
                      errorMessage = 'Email does not exist';
                      break;
                  case 'auth/wrong-password':
                      errorMessage = 'Invalid credentials';
                      break;
                  case 'auth/invalid-credential':
                      errorMessage = 'Invalid credentials';
                      break;
                  case 'auth/network-request-failed':
                      errorMessage = "Poor Internet Connectivity";
                      break;
                  default:
                      errorMessage = signInError.message;
              }
              callback(errorMessage);
              return {
                  success: false,
                  error: {
                      message: errorMessage,
                  },
              };
          }
      }
  } catch (error: any) {
      // Handle other errors
      // console.error(error);
      callback("An error occured, please try again later");
      return {
          success: false,
          error: {
              message: error.message || 'An error occurred',
          },
      };
  }
}



export async function resetUserPassword(email: string) {
  const auth = getAuth(firebaseApp);

  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
}



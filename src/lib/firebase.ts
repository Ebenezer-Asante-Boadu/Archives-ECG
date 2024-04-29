
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


// export async function signUpUserWithEmailPasswordAndStaffId(
//   email: string,
//   password: string,
//   staffId: string
// ): Promise<FirebaseUser | null> {
//   const auth = getAuth();
//   const firestore = getFirestore();

//   try {
//     // Check if a document with the given staff_id exists in the "users" collection
//     const usersCollection = collection(firestore, "users");
//     const usersQuery = query(usersCollection, where("staff_id", "==", staffId));
//     const userDocs = await getDocs(usersQuery);

//     let existingUser: FirebaseUser | null = null;

//     if (!userDocs.empty) {
//       // A user with the same staff_id already exists, get the existing user data
//       existingUser = userDocs.docs[0].data() as FirebaseUser;

//       // Update the document to add the new user's email
//       const userDocRef = doc(usersCollection, userDocs.docs[0].id);
//       await updateDoc(userDocRef, { email: email });

//       console.log("User document updated with email:", email);
//     }

//     // Proceed to sign up the user
//     const authResult = await createUserWithEmailAndPassword(auth, email, password);

//     // Additional steps after successful sign-up can be added here

//     console.log("User signed up successfully:", authResult.user?.uid);

//     // Return the updated user data
//     return existingUser;
//   } catch (error: any) {
//     // Handle errors gracefully
//     console.error("Error signing up user:", error.message);
//     // You can add more specific error handling based on error codes if needed
//     return null;
//   }
// }


// export async function _signInWithEmailPassword(
//   email: string,
//   password: string,
//   staff_id: string,
//   callback: (message: string) => void
// ) {
//   const auth = getAuth();
//   const firestore = getFirestore();

//   try {
//     // Check if a document with the given email and staff_id exists in the "users" collection
//     const usersCollection = collection(firestore, 'users');
//     const usersQuery = query(usersCollection, where('email', '==', email), where('staff_id', '==', staff_id));
//     const userDocs = await getDocs(usersQuery);

//     if (userDocs.empty) {
//       // No user found with the provided email and staff_id
//       // Check if a document with the given email exists
//       const emailQuery = query(usersCollection, where('email', '==', email));
//       const emailDocs = await getDocs(emailQuery);

//       if (emailDocs.empty) {
//         // No user found with the provided email
//         console.log("iiii1");
//         callback("User not found for the given email and staff_id");
//         return {
//           success: false,
//           error: {
//             message: 'User not found for the given email and staff_id',
//           },
//         };
//       }

//       // User found with matching email, proceed to sign up
//       callback("Signing up...");
//       console.log("iiii2");
//       const signUpResult = await signUpUserWithEmailPasswordAndStaffId(email, password, staff_id);

//       if (signUpResult) {
//         callback("Enter your credentials to sign in");
//         return {
//           success: true,
//           message: 'Successfully signed up and logged in',
//           user: { email: signUpResult.email, status: signUpResult.status },
//         };
//       } else {
//         return {
//           success: false,
//           error: {
//             message: 'Error during sign-up process',
//           },
//         };
//       }
//     }

//     // User found with matching email and staff_id, proceed with signing in
//     const user = userDocs.docs[0].data() as FirebaseUser;

//     // Retrieve user document from Firestore using email
//     const emailDocQuery = query(usersCollection, where('email', '==', email));
//     const emailDocDocs = await getDocs(emailDocQuery);

//     if (!emailDocDocs.empty) {
//       const userData = emailDocDocs.docs[0].data();
//       console.log("Signing in...")
//       return {
//         success: true,
//         message: 'Successfully logged in',
//         user: { email: userData.email, status: userData.status },
//       };
//     } else {
//       console.log("couldn't find user document by email")
//       return {
//         success: false,
//         error: {
//           message: 'User document not found by email',
//         },
//       };
//     }
//   } catch (error: any) {
//     console.log(error)
//     if (error.code === 'auth/user-not-found') {
//       return {
//         success: false,
//         error: {
//           message: 'Email does not exist',
//         },
//       };
//     } else if (error.code === 'auth/wrong-password' || error.code === "auth/invalid-login-credentials") {
//       return {
//         success: false,
//         error: {
//           message: 'Wrong password',
//         },
//       };
//     } else {
//       return {
//         success: false,
//         error: {
//           message: error.message,
//         },
//       };
//     }
//   }
// }


// export async function signUpUserWithEmailPasswordAndStaffId(
//   email: string,
//   password: string,
//   staffId: string,
//   callback: (message: string) => void
// ): Promise<{ success: boolean;  error?: { message: string } }> {
//   const auth = getAuth();
//   const firestore = getFirestore();

//   try {
//       // Proceed to sign up the user
//       const authResult = await createUserWithEmailAndPassword(auth, email, password);

//       // Additional steps after successful sign-up can be added here

//       console.log("User signed up successfully:", authResult.user?.uid);

//       // Return the updated user data
//       return {
//           success: true,
//       };
//   } catch (error: any) {
//       // Handle errors gracefully
//       console.error("Error signing up user:", error.message);
//       // You can add more specific error handling based on error codes if needed

//       let errorMessage = 'Error signing up user';
//       switch (error.code) {
//           case 'auth/email-already-in-use':
//               errorMessage = 'Email already in use';
//               break;
//           case 'auth/weak-password':
//               errorMessage = 'Weak password';
//               break;
//           default:
//               errorMessage = error.message || 'An error occurred';
//       }

//       // Invoke the callback function with the error message
//       callback(errorMessage);

//       return {
//           success: false,
//           error: {
//               message: errorMessage,
//           },
//       };
//   }
// }



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



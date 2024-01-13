// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { connectFirestoreEmulator, getFirestore ,  collection, addDoc, 
//   serverTimestamp, doc, setDoc, getDoc, getDocs, query, limit, where} from "firebase/firestore";
// import type { UserRequest } from "./types";

// const firebaseConfig = {
//   apiKey: "AIzaSyC6LsDYKUv3F8KaL38da6CqKJY2k6w8rP0",
//   authDomain: "ecg-archives.firebaseapp.com",
//   projectId: "ecg-archives",
//   storageBucket: "ecg-archives.appspot.com",
//   messagingSenderId: "280643417076",
//   appId: "1:280643417076:web:b69bf0c53fccf1eecc7fa1",
//   measurementId: "G-650FJKVWPM"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// connectFirestoreEmulator(db, '127.0.0.1', 8080);




// export async function addRequest(request: Omit<UserRequest, 'date'>): Promise<UserRequest | false> {
//   try {
//     // Add the document to the "requests" collection with server timestamp
//     const docRef = doc(collection(db, 'requests'));
//     await setDoc(docRef, {
//       ...request,
//       date: serverTimestamp(),
//       verified: false
//     });

//     console.log('Document successfully added!');
//     const docSnap = await getDoc(docRef);
//     return docSnap.data() as UserRequest || false;
//   } catch (error) {
//     console.error('Error adding document: ', error);
//     return false;
//   }
// }


// export async function getRequestByStaffId(staff_id: string): Promise<UserRequest | false> {
//   try {
//     // Get the document from the "requests" collection where staff_id is equal to the function parameter
//     const querySnapshot = await getDocs(query(collection(db, 'requests'), where('staff_id', '==', staff_id), limit(1)));

//     // Check if the query returned any documents
//     if (querySnapshot.empty) {
//       console.log('No matching documents found');
//       return false;
//     }

//     // Get the first document in the query snapshot
//     const docSnapshot = querySnapshot.docs[0];

//     console.log('Document successfully retrieved!');
//     return docSnapshot.data() as UserRequest;
//   } catch (error) {
//     console.error('Error retrieving document: ', error);
//     return false;
//   }
// }

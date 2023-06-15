import { initializeApp } from 'firebase-admin';
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };
  
  export class Firebase{
    constructor(){
        const app = initializeApp(firebaseConfig);
    }
  }

  //TODO: STORE, RETRIEVE, UPDATE AND DELETE DOCUMENT AND FILES
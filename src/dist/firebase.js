"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firebase = void 0;
const app_1 = require("firebase-admin/app");
const firebaseConfig = {
    apiKey: "AIzaSyCMeKky2FyaCwTiI5lNz46VtJJd68b9O4I",
    authDomain: "tkayel.firebaseapp.com",
    projectId: "tkayel",
    storageBucket: "tkayel.appspot.com",
    messagingSenderId: "957300711510",
    appId: "1:957300711510:web:a7fac2141969e6b3ff5bf7",
    measurementId: "G-WXNH8VC627"
};
class Firebase {
    constructor() {
        const app = (0, app_1.initializeApp)(firebaseConfig);
    }
}
exports.Firebase = Firebase;
//TODO: STORE, RETRIEVE, UPDATE AND DELETE DOCUMENT AND FILES

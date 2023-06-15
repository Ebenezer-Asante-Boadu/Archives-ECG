"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firebase = void 0;
const firebase_admin_1 = require("firebase-admin");
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
class Firebase {
    constructor() {
        const app = (0, firebase_admin_1.initializeApp)(firebaseConfig);
    }
}
exports.Firebase = Firebase;
//TODO: STORE, RETRIEVE, UPDATE AND DELETE DOCUMENT AND FILES

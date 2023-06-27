"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firebase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const { Timestamp, FieldValue, FieldPath, Query } = firebase_admin_1.default.firestore;
const serviceAccount = require('../../tkayel-firebase.json');
const storage_1 = require("@google-cloud/storage");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
const gc = new storage_1.Storage({
    projectId: "tkayel",
    keyFilename: 'tkayel-firebase.json'
});
class Firebase {
    constructor() {
    }
    ;
    addData(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = firebase_admin_1.default.firestore();
            let results = false;
            try {
                const ref = db.collection(options.collection).doc(options.sub_directory);
                yield ref.set(options.data, { merge: true });
                console.log("the firebase data was successfully added");
                results = true;
            }
            catch (err) {
                results = false;
                console.error("there was an error adding firebase data");
                console.error(err);
            }
            return results;
        });
    }
    deleteDocument(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = firebase_admin_1.default.firestore();
            let results = false;
            try {
                yield db.collection(options.collection).doc(options.sub_directory).delete();
                results = true;
                console.log("firebase document successfully deleted");
            }
            catch (err) {
                results = false;
                console.error("couldn't delete firebase document");
                console.error(err);
            }
            return results;
        });
    }
    deleteDocumentField(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = firebase_admin_1.default.firestore();
            let results = false;
            let fields = {};
            try {
                const ref = db.collection(options.collection).doc(options.sub_directory);
                options.fields.forEach((item) => {
                    fields[item] = FieldValue.delete();
                });
                yield ref.update(fields);
                results = true;
                console.log("firebase fields successfully deleted");
            }
            catch (err) {
                results = false;
                console.error("couldn't delete firebase fields");
                console.error(err);
            }
            return results;
        });
    }
    updateField(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = firebase_admin_1.default.firestore();
            let results = false;
            try {
                const ref = db.collection(options.collection).doc(options.sub_directory);
                yield ref.update(options.data);
                results = true;
                console.log("firebase fields successfully updated");
            }
            catch (err) {
                results = false;
                console.error("couldn't update firebase fields");
                console.error(err);
            }
            return results;
        });
    }
    getFirebaseDocument(collection, directory) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = firebase_admin_1.default.firestore();
            let results = 0;
            try {
                const ref = db.collection(collection).doc(directory);
                yield ref.get()
                    .then((data) => {
                    results = data;
                    console.log("successfully retrieved data");
                })
                    .catch((err) => {
                    console.log("couldn't add data");
                    console.error(err);
                });
            }
            catch (err) { }
            return results.data();
        });
    }
    getAllFirebaseDocument(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = firebase_admin_1.default.firestore();
            let results = {};
            try {
                const ref = db.collection(collection);
                yield (yield ref.get()).forEach((data) => {
                    results[data.id] = data.data();
                    // console.log(results);
                    console.log("successfully retrieved all firebase documents");
                });
            }
            catch (err) { }
            return results;
        });
    }
    uploadFirebaseFile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            // const storage = new Storage();
            const opt = {
                destination: options.new_filename,
                preconditionOpts: { ifGenerationMatch: 0 },
                // metadata: {
                //   customMetadata:{}
                // }
            };
            try {
                let v = yield gc.bucket(options.bucketName).upload(options.path_to_the_file_to_upload, opt);
                console.log("successfully uploaded");
                console.log(v);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    renameFirebaseFile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield gc.bucket(options.bucketName).file(options.oldname).rename(options.newname);
                console.log("successfully rename firebase file");
            }
            catch (err) {
                console.log("error in renaming the file " + err);
            }
        });
    }
    deleteFirebaseFile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield gc.bucket(options.bucketName).file(options.file).delete();
                console.log("succesfully deleted the firebase file");
            }
            catch (err) {
                console.log("error in deleting firebase file " + err);
            }
        });
    }
    downloadFirebaseFile(bucketName, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield gc.bucket(bucketName).file(fileName).download({ destination: `./src/dist/DOWNLOADS/${fileName}` });
                console.log("successfully downloaded firebase file");
            }
            catch (err) {
                console.log("error in downloading firebase file " + err);
            }
        });
    }
}
exports.Firebase = Firebase;
//TODO: getAlFirebaseDocument, storage operations and proper error checking

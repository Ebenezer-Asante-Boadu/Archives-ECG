import { addFirebaseData, deleteFirebaseDocument, deleteFirebaseFields, deleteFirebaseFile, newObject, renameFirebaseFile, updateFirebaseFields, uploadFirebaseFile} from './Types';
import admin, { storage } from "firebase-admin"
const { Timestamp, FieldValue, FieldPath, Query } = admin.firestore;
const serviceAccount = require('../../tkayel-firebase.json');
import {Storage, TransferManager} from "@google-cloud/storage"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const gc= new Storage({
  projectId: "tkayel",
  keyFilename: 'tkayel-firebase.json'
});

  
  export class Firebase{
    constructor(){
    };

    public async addData(options:addFirebaseData){
      const db =  admin.firestore();
      let results:boolean = false;

      try{
        const ref = db.collection(options.collection).doc(options.sub_directory);
        await ref.set(options.data, {merge: true});
        console.log("the firebase data was successfully added");
        results = true;
      } catch(err){
        results = false;
        console.error("there was an error adding firebase data");
        console.error(err);
      }
      return results;
    }


    public async deleteDocument(options:deleteFirebaseDocument){
      const db = admin.firestore();
      let results:boolean = false;

      try{
        await db.collection(options.collection).doc(options.sub_directory).delete();
        results = true;
        console.log("firebase document successfully deleted");
      } catch(err){
        results = false;
        console.error("couldn't delete firebase document");
        console.error(err);
      }
      return results;
    }


    public async deleteDocumentField(options:deleteFirebaseFields){
      const db = admin.firestore();
      let results:boolean = false;
      let fields:any = {}

      try{
        const ref = db.collection(options.collection).doc(options.sub_directory);
        options.fields.forEach((item)=>{
          fields[item] = FieldValue.delete()
        });
        await ref.update(fields);
        results = true;
        console.log("firebase fields successfully deleted");
      } catch(err){
        results = false;
        console.error("couldn't delete firebase fields");
        console.error(err);
      }
      return results;
    }


    public async updateField(options:updateFirebaseFields){
      const db = admin.firestore();
      let results:boolean = false;

      try{
        const ref = db.collection(options.collection).doc(options.sub_directory);
        await ref.update(options.data);
        results = true;
        console.log("firebase fields successfully updated");
      }catch(err){
        results = false;
        console.error("couldn't update firebase fields");
        console.error(err);
      }
      return results;
    }


    public async getFirebaseDocument(collection:string, directory:string){
      const db = admin.firestore();
      let results:any = 0;

      try{
        const ref = db.collection(collection).doc(directory);
        await ref.get()
        .then((data:any)=>{
          results = data;
          console.log("successfully retrieved data");
        })
        .catch((err:any)=>{
          console.log("couldn't add data");
          console.error(err);
        })
      } catch(err){}
      return results.data();
    }


    public async getAllFirebaseDocument(collection:string){
      const db = admin.firestore();
      let results:newObject = {};

      try{
        const ref = db.collection(collection);
        await (await ref.get()).forEach((data:any)=>{
          results[data.id] = data.data();
          // console.log(results);
          console.log("successfully retrieved all firebase documents");
        });
      } catch(err){}
      return results;
    }


    public async uploadFirebaseFile(options:uploadFirebaseFile){
      // const storage = new Storage();
      const opt = {
        destination: options.new_filename, 
        preconditionOpts : {ifGenerationMatch: 0}, 
        // metadata: {
        //   customMetadata:{}
        // }
      };
      try{
        let v  = await gc.bucket(options.bucketName).upload(options.path_to_the_file_to_upload, opt);
        console.log("successfully uploaded");
        console.log(v);
      } catch(err){
        console.log(err);
      }
    }


    public async renameFirebaseFile(options:renameFirebaseFile){
      try{
        await gc.bucket(options.bucketName).file(options.oldname).rename(options.newname);
        console.log("successfully rename firebase file");
      } catch(err){
        console.log("error in renaming the file " + err);
      }
    }


    public async deleteFirebaseFile(options:deleteFirebaseFile){
      try{
        await gc.bucket(options.bucketName).file(options.file).delete();
        console.log("succesfully deleted the firebase file");
      }catch(err){
        console.log("error in deleting firebase file "+ err);
      }
    }


    public async downloadFirebaseFile(bucketName:string, fileName:string){
      try{
        await gc.bucket(bucketName).file(fileName).download({destination: `./src/dist/DOWNLOADS/${fileName}`});
        console.log("successfully downloaded firebase file");
      }catch(err){
        console.log("error in downloading firebase file "+ err);
      }
    }
  }

  //TODO: getAlFirebaseDocument, storage operations and proper error checking
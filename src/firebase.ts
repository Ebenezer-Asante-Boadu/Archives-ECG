import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import { addFirebaseData, deleteFirebaseDocument, deleteFirebaseFields, newObject, updateFirebaseFields } from './Types';
const serviceAccount = require('../../tkayel-firebase.json');

  
  export class Firebase{
    private app = initializeApp({credential: cert(serviceAccount)})
    constructor(){
    };

    public async addData(options:addFirebaseData){
      const db = getFirestore();
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
      const db = getFirestore();
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
      const db = getFirestore();
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
      const db = getFirestore();
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
      const db = getFirestore();
      let results:any = 0;

      try{
        const ref = db.collection(collection).doc(directory);
        await ref.get()
        .then((data)=>{
          results = data;
          console.log("successfully retrieved data");
        })
        .catch((err)=>{
          console.log("couldn't add data");
          console.error(err);
        })
      } catch(err){}
      return results.data();
    }


    public async getAllFirebaseDocument(collection:string){
      const db = getFirestore();
      let results:newObject = {};

      try{
        const ref = db.collection(collection);
        await (await ref.get()).forEach((data)=>{
          results[data.id] = data.data();
          // console.log(results);
          console.log("successfully retrieved all firebase documents");
        });
      } catch(err){}
      return results;
    }
  }

  //TODO: getAlFirebaseDocument, storage operations and proper error checking
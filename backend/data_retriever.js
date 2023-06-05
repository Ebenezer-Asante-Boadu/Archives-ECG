import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js'
import { app } from '../main.js';



export class Data{
    #db = getFirestore(app);
    constructor(){
        this.storage = {};
    }
    
    async getAllDocuments(id) {
        try {
          const querySnapshot = await getDocs(collection(this.#db, id));
          querySnapshot.forEach((doc, index) => {
            this.storage[index] = doc.data();
          });
        } catch (error) {
          this.storage = error;
        }
        return this.storage;
    }
}





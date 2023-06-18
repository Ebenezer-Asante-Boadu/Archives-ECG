import express, {Response} from 'express';
const { exec } = require('child_process');
const path = require('path');
import { _Database } from './Database';
import { logError } from './Error_logger';
require('dotenv').config(); 
import "./Mailer"

 //new Firebase().addData({collection:"categories", sub_directory: "categories1", data: {"name":"derrick"}});
//  new Firebase().getAllFirebaseDocument("categories");
//  logError({id: 3, file: "op", line:"h", message:"786",error_code:"okp"});
// new Firebase().uploadFirebaseFile({filepath:"src/dist/FILES_TO_UPLOAD", filename:"derrick.txt", generationMatchPrecondition:0, bucketName:"gs://tkayel.appspot.com"})
const app = express();
const port = 3000;

// Serve static assets with explicit MIME type
app.use(express.static(path.join(__dirname, '../../front-end/src/')));

app.get('/', (_, res:Response) => {
  res.sendFile(path.join(__dirname, '../../front-end/src/views/homepage/homepage.html'));
});

app.get('/database-management', (_, res:Response) => {
  res.sendFile(path.join(__dirname, '../../front-end/src/views/database/database.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port localhost:${port}`);
});

 //_Database.createTable({database_name: "BOM", tableName: "kok", columns: ["id", "name", "complexion"], types: ["int", "varchar(255)", "varchar(255)"]});
// _Database.deleteTable("BOM", "kok");

//TODO: SPECIFIC DATABASE FORMANAGING DYNAMIC ENVIRONMENT VARIABLES
// if(process.env.DEVELOPMENT_STARTED_COUNT == "0"){ console.log(process.env.DEVELOPMENT_STARTED_COUNT);
//   process.env.DEVELOPMENT_STARTED_COUNT = "1";  
//   exec('start http://localhost:3000/home');
// }else if (process.env.NODE_ENV === 'production') {
//   exec('start http://localhost:3000/home');
//   console.log('Running in production mode');
// } 
//startBrowserAutomatically();


function startBrowserAutomatically(){
  const home = "http://localhost:3000/";
const possible_platforms = ["darwin", "freebsd", "linux", "openbsd", "sunos", "win32"];

 switch(process.platform){
  case possible_platforms[5]:
    exec(`start ${home}`, (error:any, stdout:any, stderr:any)=>{
      if(error){
        console.warn("Sorry, we couldn't start the application by opening the browser automatically but you can open a browser to this link localhost:3000/home");
        return;
      }
    });
    break;
  
  case possible_platforms[0]:
    exec(`open ${home}`, (error:any, stdout:any, stderr:any)=>{
      if(error){
        console.warn("Sorry, we couldn't start the application by opening the browser automatically but you can open a browser to this link localhost:3000/home");
        return;
      }
    });
    break;
  
  case possible_platforms[1] || possible_platforms[2] || possible_platforms[3] || possible_platforms[4]:
    exec(`xdg-open ${home}`, (error:any, stdout:any, stderr:any)=>{
      if(error){
        console.warn("Sorry, we couldn't start the application by opening the browser automatically but you can open a browser to this link localhost:3000/home");
        return;
      }
    });
    break;
 }
}

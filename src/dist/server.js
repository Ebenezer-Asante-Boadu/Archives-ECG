"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();
//import "./Mailer"
//new Firebase().addData({collection:"categories", sub_directory: "categories1", data: {"name":"derrick"}});
// const y = new Firebase(); y.getFirebaseDocument("categories", "category1")
//  .then((data)=>{console.log(data)});
//  logError({id: 3, file: "op", line:"h", message:"786",error_code:"okp"});
// new Firebase().uploadFirebaseFile({bucketName:"tkayel.appspot.com", path_to_the_file_to_upload: "./src/dist/FILES_TO_UPLOAD/derrick.txt", new_filename:"NEW.txt"});
//const _path = "./src/dist/FILES_TO_UPLOAD/";
// new Firebase().uploadFirebaseMultiplefiles({bucketName: "tkayel.appspot.com", path_to_the_files_to_upload: [`${_path}derrick.txt`, `${_path}kpalu.txt`]});
//new Firebase().deleteFirebaseFile({bucketName:"tkayel.appspot.com", file:"newer.txt"});
//new Firebase().downloadFirebaseFile("tkayel.appspot.com", "img.jpg");
const app = (0, express_1.default)();
const port = 3000;
// let express_static_path = (process.env.NODE_ENV == "DEVELOPMENT") ? "../../front-end/src/" :  '../../front-end/dist/app/';
// let filepath = (process.env.NODE_ENV == "DEVELOPMENT") ? "../../front-end/src/index.html" : '../../front-end/dist/app/index.html';
// Serve static assets with explicit MIME type
app.use(express_1.default.static(path.join(__dirname, '../../front-end/dist/app/')));
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../../front-end/dist/app/index.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port localhost:${port}`);
    //console.log(process.env.NODE_ENV)
});
//_Database.createTable({database_name: "BOM", tableName: "kok", columns: ["id", "name", "complexion"], types: ["int", "varchar(255)", "varchar(255)"]});
// _Database.deleteTable("BOM", "kok");
//TODO: SPECIFIC DATABASE FORMANAGING DYNAMIC ENVIRONMENT VARIABLES
// if(process.env.DEVELOPMENT_STARTED_COUNT == "1"){ 
//   startBrowserAutomatically();
// }else if (process.env.NODE_ENV === 'production') {
//   startBrowserAutomatically();
// } 
//startBrowserAutomatically();
function startBrowserAutomatically() {
    const home = "http://localhost:3000/";
    const possible_platforms = ["darwin", "freebsd", "linux", "openbsd", "sunos", "win32"];
    switch (process.platform) {
        case possible_platforms[5]:
            exec(`start ${home}`, (error, stdout, stderr) => {
                if (error) {
                    console.warn("Sorry, we couldn't start the application by opening the browser automatically but you can open a browser to this link localhost:3000/home");
                    return;
                }
            });
            break;
        case possible_platforms[0]:
            exec(`open ${home}`, (error, stdout, stderr) => {
                if (error) {
                    console.warn("Sorry, we couldn't start the application by opening the browser automatically but you can open a browser to this link localhost:3000/home");
                    return;
                }
            });
            break;
        case possible_platforms[1] || possible_platforms[2] || possible_platforms[3] || possible_platforms[4]:
            exec(`xdg-open ${home}`, (error, stdout, stderr) => {
                if (error) {
                    console.warn("Sorry, we couldn't start the application by opening the browser automatically but you can open a browser to this link localhost:3000/home");
                    return;
                }
            });
            break;
    }
}

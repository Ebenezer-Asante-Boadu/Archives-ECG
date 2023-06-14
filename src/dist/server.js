"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();
//  logError({id: 3, file: "op", line:"h", message:"786",error_code:"okp"});
const app = (0, express_1.default)();
const port = 3000;
// Serve static assets with explicit MIME type
app.use(express_1.default.static(path.join(__dirname, './public')));
app.get('/home', (_, res) => {
    res.sendFile(path.join(__dirname, './public/src/views/homepage/homepage.html'));
});
app.get('/database-management', (_, res) => {
    res.sendFile(path.join(__dirname, './public/src/views/database/database.html'));
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
// startBrowserAutomatically();
function startBrowserAutomatically() {
    const home = "http://localhost:3000/home";
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

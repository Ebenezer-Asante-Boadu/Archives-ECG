"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { exec } = require('child_process');
const path = require('path');
const app = (0, express_1.default)();
const port = 3000;
// Serve static assets with explicit MIME type
app.use(express_1.default.static(path.join(__dirname, './public')));
app.get('/home', (_, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/database-management', (_, res) => {
    res.sendFile(path.join(__dirname, './public/database.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port localhost:${port}`);
});
exec('start http://localhost:3000/home');

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const app = (0, express_1.default)();
const port = 3000;
app.get('/home', (_, res) => {
    res.sendFile(path.join(__dirname, '../../front-end/views/index.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port localhost:${port}`);
});

import express, {Response} from 'express';
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// Serve static assets with explicit MIME type
app.use(express.static(path.join(__dirname, './public')));

app.get('/home', (_, res:Response) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/database-management', (_, res:Response) => {
  res.sendFile(path.join(__dirname, './public/database.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port localhost:${port}`);
});

exec('start http://localhost:3000/home');

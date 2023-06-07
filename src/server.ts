import express, {Response} from 'express';
const path = require('path');

const app = express();
const port = 3000;

app.get('/home', (_, res:Response) => {
  res.sendFile(path.join(__dirname, '../../front-end/views/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port localhost:${port}`);
});

const path = require('path');

const connectToMongo = require('./db');
const authRouter = require('./routes/auth');
const NotesRouter = require('./routes/notes');
const express = require('express');
const cors = require('cors');
const port = 5000;
connectToMongo();
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json()); //middleware used to access body of request.
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello hardik');
});
app.use('/api/auth', authRouter);
app.use('/api/note', NotesRouter);
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

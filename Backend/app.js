const express = require('express');
const ConnectDB = require('./db/db');
const route = require('./router.js/userRoute');
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/user', route);
app.post('/signup', (req, res) => {
        // Signup logic
        res.send('User signed up');
    });
    
ConnectDB().then(
    app.listen(process.env.PORT, () => {
        console.log(`app running on ${process.env.PORT}`);
      })
);


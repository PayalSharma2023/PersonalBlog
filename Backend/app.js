const express = require('express');
const ConnectDB = require('./db/db');
const userRoute = require('./router.js/userRoute');
const blogRoute = require('./router.js/blog')
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/user', userRoute);

app.use('/blog', blogRoute);

    
ConnectDB().then(
    app.listen(process.env.PORT, () => {
        console.log(`app running on ${process.env.PORT}`);
      })
);


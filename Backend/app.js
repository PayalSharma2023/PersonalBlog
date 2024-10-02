const express = require('express');
const ConnectDB = require('./db/db');
const userRoute = require('./router.js/userRoute');
const blogRoute = require('./router.js/blog')
// const users = require('./user');
const cors = require('cors');
require('dotenv').config();

const app = express();


//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/user', userRoute);
app.use('/blog', blogRoute);



// app.get("/api/user", (req, res)=> {
//   res.send(users);
// })

    
ConnectDB().then(
    app.listen(process.env.PORT, () => {
        console.log(`app running on ${process.env.PORT}`);
        console.log(`Serve a http://localhost:${process.env.PORT}`);
      })
);


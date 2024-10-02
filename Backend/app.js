const express = require('express');
const ConnectDB = require('./db/db');
const userRoute = require('./router.js/userRoute');
const blogRoute = require('./router.js/blog')
const bodyParser = require('body-parser');
// const users = require('./user');
const cors = require('cors');
require('dotenv').config();

const app = express();


//Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust based on your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

//Routes
app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("<h1> Hello, World! </h1>");
});

// app.get("/api/user", (req, res)=> {
//   res.send(users);
// })

    
ConnectDB().then(
    app.listen(process.env.PORT, () => {
        console.log(`app running on ${process.env.PORT}`);
        console.log(`Serve a http://localhost:${process.env.PORT}`);
      })
);


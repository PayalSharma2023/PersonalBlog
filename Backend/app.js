const express = require('express');
require('dotenv').config();
const ConnectDB = require('./db/db');

const app = express();
app.use(express.json());

ConnectDB();



app.use(express.json());


const mongoose = require("mongoose");
const express = require('express');
require("dotenv").config;

const app = express();

const ConnectDB = async () => {
  mongoose.connect(process.env.DBURL)
    .then((c) => {
      console.log("connected to the database");      
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDB;

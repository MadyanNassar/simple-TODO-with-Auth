const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() { 
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  }
  start();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
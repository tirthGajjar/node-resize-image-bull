require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use('/', (req, res) => res.status(200).json({ message: "ok" }));

module.exports = {
  app
}
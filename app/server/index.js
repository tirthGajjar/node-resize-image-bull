require('dotenv').config();

const { bindMiddleware } = require('./middleware');
const { bindRoutes } = require('./routes');

const express = require('express');
const app = express();

bindRoutes(app);
bindMiddleware(app);

module.exports = {
  app,
};

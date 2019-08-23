require('dotenv').config();

const { bindMiddleware } = require('./middleware');
const { bindRoutes } = require('./routes');

const express = require('express');
const app = express();

bindMiddleware(app);
bindRoutes(app);

module.exports = {
  app,
};

const bodyParser = require('body-parser');

function bindMiddleware(app) {
  app.use(bodyParser.json({limit: '50mb'}));
}

module.exports = {
  bindMiddleware
}
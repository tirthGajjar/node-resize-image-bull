const arena = require('bull-arena');
const { IMAGE_QUEUE } = require('../../worker/queue');
const { getRedisConfig } = require('../utils');

const controllers = require("../controllers")

function bindRoutes(app) {

  app.post('/image', controllers.saveImage);
  app.get('/image/:imageId', controllers.getImageById);
  app.get('/', controllers.root);
}

module.exports = {
  bindRoutes
}

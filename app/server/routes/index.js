// const arena = require('bull-arena');
const { IMAGE_QUEUE } = require('../../worker/queue');
const { getRedisConfig } = require('../utils');

const controllers = require('../controllers');
const { uploadFile } = require('../middleware');

function bindRoutes(app) {
  app.post('/image', uploadFile.single('image'), controllers.saveImage);
  app.get('/image/:id', controllers.getImageById);
  app.get('/', controllers.root);
}

module.exports = {
  bindRoutes,
};

const controllers = require('../controllers');
const { uploadFile } = require('../middleware');

function bindRoutes(app) {
  app.post('/image', uploadFile.single('image'), controllers.saveImage);
  app.get('/image/:id', controllers.getImageById);
  app.get('/image/:id/thumbnail', controllers.getImageThumbnailById);
  app.get('/', controllers.root);
}

module.exports = {
  bindRoutes,
};

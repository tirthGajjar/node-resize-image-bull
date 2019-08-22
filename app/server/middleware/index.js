const bodyParser = require('body-parser');
const multer = require('multer');

const { CONFIG } = require('../config');
const { createTempFileNameAndAttachId } = require('../utils');

function bindMiddleware(app) {
  app.use(bodyParser.json({ limit: '50mb' }));
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, CONFIG.RAW_FILE_LOCATION);
  },
  filename: function(req, file, cb) {
    cb(null, createTempFileNameAndAttachId(file));
  },
});

const uploadFile = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  storage
});

module.exports = {
  bindMiddleware,
  uploadFile,
};

const bodyParser = require('body-parser');
const multer = require('multer');

const { CONFIG } = require('../../common/config');
const { createTempFileNameAndAttachId } = require('../utils');

const morgan = require('morgan');
const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

function bindMiddleware(app) {
  app.use(bodyParser.json({ limit: '50mb' }));

  morgan.token('id', function getId(req) {
    return req.id;
  });

  app.use(
    morgan(loggerFormat, {
      stream: process.stderr,
    })
  );
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
  storage,
});

module.exports = {
  bindMiddleware,
  uploadFile,
};

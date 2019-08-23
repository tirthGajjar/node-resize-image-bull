const imageModel = require('../models/image');
const { CONFIG } = require('../../common/config');
const { createQueue } = require('../../common/queueFactory');
const queueToInject = createQueue(CONFIG.IMAGE_QUEUE, CONFIG.REDIS_URL);

/**
 * GET: Root / endpoint
 */
function root(req, res) {
  return res.status(200).json({ message: 'ok' });
}

/**
 * `GET` returns a resource by id
 * `URL:` /image/:id
 */
async function getImageById(req, res) {
  const { id } = req.params;
  let result;
  let status = 200;

  try {
    if (!id) {
      throw new Error('id is required');
    }
    result = await imageModel.getImageById(id);
  } catch (e) {
    status = 500;
    result = {
      message: e.message,
    };
  }

  return res.status(status).json({ ...result });
}

/**
 * `GET` returns a resource by id
 * `URL:` /image/:id/thumbnail
 */
async function getImageThumbnailById(req, res) {
  const { id } = req.params;
  let resultBuffer;
  let errorMessage;
  let status = 200;

  try {
    if (!id) {
      throw new Error('id is required');
    }

    resultBuffer = await imageModel.getImageThumbnailBufferById(id);
  } catch (e) {
    errorMessage = e.message;
    status = 500;
  }

  if (status === 500) {
    return res.status(status).send(errorMessage);
  }

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': resultBuffer.length,
  });
  res.end(resultBuffer);
}

/**
 * `POST` Saves a posted image for resizing
 * `URL:` /image
 */
async function saveImage(req, res) {
  let status = 200;
  let result;

  try {
    if (!req.file) {
      throw new Error('No file provided');
    }
    result = await imageModel.saveImage(req.file, queueToInject);
  } catch (e) {
    status = 500;
    result = {
      message: e.message,
    };
  }

  return res.status(status).json({ ...result });
}

module.exports = {
  root,
  getImageById,
  getImageThumbnailById,
  saveImage,
};

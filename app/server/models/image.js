const { IMAGE_STATES } = require('../../common/constants');
const { CONFIG } = require('../../common/config');
const { getRedisConnectionInstance } = require('../../common/redis');
const { readFileFromLocation } = require('../../common/services/imageService');

/**
 * Creates a URL for RESTful return.
 *
 * NOTE: The base URL should be loaded from a config, but
 * left as is for practicality
 */
function createResourceUrlObject(id) {
  return `http://localhost:3001/image/${id}`;
}

/**
 *
 */
function createResourceUrlObjectThumbail(fileObject) {
  const url = `http://localhost:3001/image/${fileObject.id}/thumbnail`;

  return fileObject.state === IMAGE_STATES.RESIZED ? url : undefined;
}

/**
 *
 */
function modelResult(fileObject, status) {
  return {
    id: fileObject.id,
    filename: fileObject.filename,
    status,
    url: createResourceUrlObject(fileObject.id),
    thumbnailUrl: createResourceUrlObjectThumbail(fileObject),
  };
}

/**
 *
 */
async function getImageData(imageId) {
  const redisInstance = await getRedisConnectionInstance();
  const result = await redisInstance.get(imageId);
  const parsedResult = JSON.parse(result);

  return parsedResult;
}

/**
 *
 */
async function saveImage(file, imageQueue) {
  const redisInstance = await getRedisConnectionInstance();
  file.state = IMAGE_STATES.PROCESSING;
  const setResult = await redisInstance.set(file.id, JSON.stringify(file));

  await imageQueue.add(file);

  if (!setResult || setResult !== 'OK') {
    throw new Error('Saving to Redis failed.');
  }

  return modelResult(file, IMAGE_STATES.PROCESSING);
}

/**
 *
 */
async function getImageById(imageId) {
  const imageData = await getImageData(imageId);
  if (!imageData) {
    throw new Error(`Image data not found for ${imageId}`)
  }
  return modelResult(imageData, imageData.state);
}

/**
 *
 */
async function getImageThumbnailBufferById(imageId) {
  const imageData = await getImageData(imageId);

  if (!imageData) {
    throw new Error(`Image data not found for ${imageId}`)
  }

  if (imageData.state !== IMAGE_STATES.RESIZED) {
    throw new Error('Cannot get thumbnail until image is resized');
  }

  return readFileFromLocation(
    `${CONFIG.PERMANENT_LOCATION}/${imageData.id}.png`
  );
}

module.exports = {
  getImageThumbnailBufferById,
  saveImage,
  getImageById,
};

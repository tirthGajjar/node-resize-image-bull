const { IMAGE_STATES } = require('../constants');
const { getRedisConnectionInstance } = require('../utils');

/**
 * 
 */
function modelResult(fileObject, status) {
  return {
    id: fileObject.id,
    filename: fileObject.filename,
    status,
  };
}

/**
 * 
 */
async function saveImage(file) {
  const redisInstance = await getRedisConnectionInstance();
  file.state = IMAGE_STATES.PROCESSING;
  const setResult = await redisInstance.set(file.id, JSON.stringify(file));

  if (!setResult || setResult !== 'OK') {
    throw new Error('Saving to Redis failed.');
  }

  return modelResult(file, IMAGE_STATES.PROCESSING);
}

/**
 * 
 */
async function getImageById(imageId) {
  const redisInstance = await getRedisConnectionInstance();
  const result = await redisInstance.get(imageId);
  const parsedResult = JSON.parse(result);

  return modelResult(parsedResult, parsedResult.state);
}

module.exports = {
  saveImage,
  getImageById,
};

const uuid = require('uuid');
const path = require('path');

/**
 *
 */
function getUuid() {
  return uuid.v4();
}

function getExtension(filename) {
  return path.extname(filename);
}

/**
 *
 */
function createTempFileNameAndAttachId(file) {
  const uuid = getUuid();

  // monkey patch file with ID for later access
  file.id = getUuid();

  return `${uuid}${getExtension(file.originalname)}`;
}

module.exports = {
  createTempFileNameAndAttachId,
};

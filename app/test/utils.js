const fs = require('fs').promises;
const request = require('supertest');
const { CONFIG } = require('../common/config');
const { expect } = require('chai');

async function cleanup(queue) {
  if (queue) {
    await queue.empty();
  }

  const files = await fs.readdir(CONFIG.RAW_FILE_LOCATION);

  for (const file of files) {
    await fs.unlink(`${CONFIG.RAW_FILE_LOCATION}/${file}`);
  }
}

function getImage(app, imageId) {
  return request(app).get(`/image/${imageId}`);
}

function getTestImagePath() {
  return `${process.cwd()}/app/common/fixtures/arch.png`;
}

function postImage(app, testCallback) {
  request(app)
    .post('/image')
    .attach('image', getTestImagePath())
    .end(testCallback);
}

function validateStructure(body) {
  const props = ['id', 'filename', 'status'];

  for (const prop of props) {
    expect(body.hasOwnProperty(prop)).to.be.true;
  }
}

module.exports = {
  cleanup,
  getImage,
  getTestImagePath,
  postImage,
  validateStructure,
};

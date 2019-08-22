const fs = require('fs').promises;
const request = require('supertest');
const assert = require('assert');

const { app } = require('../../../server');
const { CONFIG } = require('../../../server/config');

function postImage(testCallback) {
  const testImage = `${process.cwd()}/app/test/integration/server/fixtures/arch.png`;

  request(app)
    .post('/image')
    .attach('image', testImage)
    .end(testCallback);
}

function getImage(imageId) {
  return request(app).get(`/image/${imageId}`)
}

async function cleanup() {
  const files = await fs.readdir(CONFIG.RAW_FILE_LOCATION);

  for (const file of files) {
    await fs.unlink(`${CONFIG.RAW_FILE_LOCATION}/${file}`);
  }
}

function validateStructure(body) {
  const props = ['id', 'filename', 'status'];

  for (const prop of props) {
    assert(
      body.hasOwnProperty(prop),
      `${prop} should exist on response`
    );
  }
}

describe('Root', function() {
  it('should return 200 with "ok"', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.message === 'ok', 'root is invalid');
        done();
      });
  });
});

describe('Upload Image', () => {
  beforeEach(done => {
    cleanup().then(() => done());
  });

  after(done => {
    cleanup().then(() => done());
  });

  it('Successfully uploads jpg image', done => {
    postImage(async function(err, res) {
      const files = await fs.readdir(CONFIG.RAW_FILE_LOCATION);
      assert(files.length === 1, 'Image upload should upload one file');

      done();
    });
  });

  it('Returns the correct JSON structure', done => {
    postImage(async function(err, res) {
      validateStructure(res.body)
      done();
    });
  });
});


describe('Get uploaded image by id', () => {
  beforeEach(done => {
    cleanup().then(() => done());
  });

  after(done => {
    cleanup().then(() => done());
  });

  it('Retrieves an image by ID and returns the correct structure', done => {
    postImage(async function(err, res) {
      const getImageResponse = await getImage(res.body.id)

      validateStructure(getImageResponse.body)
      done();
    });
  });

});



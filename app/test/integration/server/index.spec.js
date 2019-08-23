const fs = require('fs').promises;
const request = require('supertest');
const assert = require('assert');

const { app } = require('../../../server');
const { CONFIG } = require('../../../common/config');

const { expect } = require('chai');

const {
  cleanup,
  getImage,
  postImage,
  validateStructure,
} = require('../../utils');

describe('Root', function() {
  it('should return 200 with "ok"', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.message === 'ok').to.be.true;
        done();
      });
  });
});

describe('Upload Image', () => {
  beforeEach(done => {
    cleanup().then(() => done());
  });

  afterEach(done => {
    cleanup().then(() => done());
  });

  it('Successfully uploads jpg image', done => {
    postImage(app, async function(err, res) {
      const files = await fs.readdir(CONFIG.RAW_FILE_LOCATION);
      expect(files.length === 1).to.be.true;

      done();
    });
  });

  it('Returns the correct JSON structure', done => {
    postImage(app, async function(err, res) {
      validateStructure(res.body);
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
    postImage(app, async function(err, res) {
      const getImageResponse = await getImage(app, res.body.id);

      validateStructure(getImageResponse.body);
      done();
    });
  });
});

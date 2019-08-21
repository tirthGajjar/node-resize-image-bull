const request = require('supertest');
const assert = require('assert');
const { app } = require('../../../server');

describe('Integration tests', function() {
  it('should return 200 with "ok"', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.message === 'ok', 'root is invalid');
        done();
      });
  });

  it('should return 200 with "ok"', function(done) {
    request(app)
      .post('/image')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.message === 'ok', 'saveImage is invalid');
        done();
      });
  });

  it('should return 200 with "ok"', function(done) {
    request(app)
      .get('/image/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.message === 'ok', 'getImageById is invalid');
        done();
      });
  });
});

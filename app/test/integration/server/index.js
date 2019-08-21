const request = require('supertest');
const assert = require('assert');
const {app} = require('../../../server');

it('should return 200 with "ok"', function(done) {
  request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      assert(response.body.message, 'ok');
      done()
    });
});

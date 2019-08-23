/**
 * File level fixture
 */
const fakeImageUpload = {
  fieldname: 'image',
  originalname: 'arch.png',
  encoding: '7bit',
  mimetype: 'image/png',
  id: 'af0eb83d-1428-4696-8c7e-fc8c89d714a8',
  destination: '/app/tmp',
  filename: '9ff44249-b189-45d5-8e47-0297d288738e.png',
  path: '/app/tmp/9ff44249-b189-45d5-8e47-0297d288738e.png',
  size: 61146,
  state: 'PROCESSING',
};

const Queue = require('bull');
const { saveImage } = require('../../../../server/models/image');
const { cleanup } = require('../../../utils');

/**
 * Test libs
 */
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

/**
 * Dependency injected queue objects
 */
const injectedQueueNoProcess = new Queue(
  'TEST_QUEUE_NO_PROCESS',
  process.env.REDIS_URL
);

const injectedQueue = new Queue('TEST_QUEUE', process.env.REDIS_URL);
injectedQueue.process(() => {});

/**
 * Image model tests
 */
describe('image model', () => {
  beforeEach(done => {
    cleanup(injectedQueueNoProcess).then(() => done());
  });

  it('should queue an image for resizing', done => {
    describe('Resize image', async () => {
      expect(await injectedQueueNoProcess.count()).to.eq(0);

      await saveImage(fakeImageUpload, injectedQueueNoProcess);

      let queued = await injectedQueueNoProcess.count();
      expect(queued).to.eq(1);

      await injectedQueueNoProcess.empty();
      done();
    });
  });
});

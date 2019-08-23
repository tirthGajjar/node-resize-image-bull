const { setupQueue } = require('../setupeQueue');

/**
 * Test libs
 */
const chai = require('chai');
const spies = require('chai-spies');

// Mocking setup
chai.use(spies);
const expect = chai.expect;
const mockProcessQueueFunc = () => {};
const processSpy = chai.spy(mockProcessQueueFunc);

describe('setup queue', () => {
  it('adds and processes an item', async () => {
    const queue = setupQueue('test_queue', process.env.REDIS_URL, processSpy);

    const addAndProcess = new Promise((resolve, _reject) => {
      queue.add({ foo: 'bar' });

      queue.on('completed', job => {
        expect(processSpy).to.have.been.called.once;
        resolve();
      });
    });

    await addAndProcess;
  });
});

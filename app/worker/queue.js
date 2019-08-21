const Queue = require('bull');

const IMAGE_QUEUE = 'IMAGE_QUEUE';

const queues = {
  [IMAGE_QUEUE]: new Queue(
    IMAGE_QUEUE,
    process.env.REDIS_URL
  )
};

module.exports = {
  IMAGE_QUEUE,
  queues
}
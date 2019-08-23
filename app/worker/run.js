const { CONFIG } = require('../common/config');
const { processQueuedItem } = require('./processQueuedItem');
const { setupQueue } = require('./setupeQueue');

setupQueue(CONFIG.IMAGE_QUEUE, CONFIG.REDIS_URL, processQueuedItem);

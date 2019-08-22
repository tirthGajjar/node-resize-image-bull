const url = require('url');
const Redis = require('ioredis');
const uuid = require('uuid');
const path = require("path");

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

/**
 *
 */
function getRedisConfig(redisUrl) {
  const redisConfig = url.parse(redisUrl);

  return {
    host: redisConfig.hostname,
    port: Number(redisConfig.port) || 6379,
    database: 0,
  };
}

let redisInstance = undefined;
/**
 *
 */
async function getRedisConnectionInstance() {
  try {
    if (!redisInstance) {
      const config = getRedisConfig(process.env.REDIS_URL);

      redisInstance = await new Redis({
        port: config.port,
        host: config.host,
        db: config.database,
      });
    }
  } catch (e) {
    console.log(e);
  }

  return redisInstance;
}

module.exports = {
  createTempFileNameAndAttachId,
  getRedisConfig,
  getRedisConnectionInstance,
};

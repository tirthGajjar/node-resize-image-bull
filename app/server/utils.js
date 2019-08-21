const url = require('url');
const Redis = require('ioredis');

function getRedisConfig(redisUrl) {
  const redisConfig = url.parse(redisUrl);

  return {
    host: redisConfig.hostname,
    port: Number(redisConfig.port) || 6379,
    database: 0,
  };
}

let redisInstance = undefined;

function getRedisConnectionInstance() {
  if (!redisInstance) {
    const config = getRedisConfig(process.env.REDIS_URL);

    redisInstance = new Redis({
      port: config.port,
      host: config.host,
      family: 4,
      db: config.database,
    });
  }

  return redisInstance;
}

module.exports = {
  getRedisConfig,
  getRedisConnectionInstance,
};

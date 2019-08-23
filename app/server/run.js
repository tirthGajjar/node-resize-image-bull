const { app } = require('./index');
const { PORT } = process.env;
const { logger } = require('../common/logger');

app.listen(PORT, () => {
  logger.info('Listening on ' + PORT);
});

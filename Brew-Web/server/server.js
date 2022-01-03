process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var config = require('./config/config'),
  log = require('./util/log');

config.get().then( async (cfg) =>  {
  log.info('Starting Brew Web on port ' + cfg['server'].port);
  try {
    await require('./web').start();
    log.info('Started Brew Web on port ' + cfg['server'].port);
  } catch (err) {
    console.error(err);
    log.error(err);
  }
})

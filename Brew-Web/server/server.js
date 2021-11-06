process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var config = require('./config'),
  log = require('./services/log');

config.get().then(cfg => {
  log.info('Starting Brew Web on port ' + cfg['server'].port);
  console.log('Starting Brew Web on port ' + cfg['server'].port);
  require('./web').start().then(serverStart=> {
    log.info('Started Brew Web on port ' + cfg['server'].port);
    console.log('Starting Brew Web on port ' + cfg['server'].port);
  }).catch(error=> {
    console.error(error);
    log.error(error);
  });
})

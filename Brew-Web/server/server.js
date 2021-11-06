process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var async = require('async'),
  config = require('./config'),
  log = require('services/log');

async.waterfall([
    //log
    //config
    async.apply(config.get),
    function(config, next) {

        process.on('uncaughtException', err => {
            console.error(err);
            process.exit(1);
        });

        console.log('Starting My App on port ' + config['server'].port);
        require('./web').start(function (err) {
            if (err) {
                return next(err);
            }

            console.log('Server started.');
            next();
        });
    }
], function(err) {

    if(err) {
        console.error('Failed to start web-server:');
        throw err;
    }

});

config.get().then(cfg => {
  log.info('Starting My App on port ' + config['server'].port);
  console.log('Starting My App on port ' + config['server'].port);

})

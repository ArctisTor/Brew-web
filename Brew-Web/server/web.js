/**
 * Module dependencies.
 */
const express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    path = require('path'),
    log = require('./services/log'),
    http = require('http'),
config = require('./config');

module.exports.start = function (callback) {

    /**
     * Create Express web-server.
     */
    const app = express();

    /**
     * Add Mongo/Mongoose connection stuff here
     */
    config.get(function (err, config) {

        if (err) {
            return callback(err);
        }

        /*
        Add Mongo/Mongoose connection stuff here
         */
        // if (process.env.MONGO_URI) {
        //     //use env
        //     mongoose.connect(process.env.MONGO_URI);
        // } else {
        //     var mongoConfig;
        //     if (process.env.MONGO_URI === 'test') {
        //         mongoConfig = config['mongo-test'];
        //     } else {
        //         mongoConfig = config.mongo;
        //     }
        //
        //     if (!mongoConfig) {
        //         return new Error('No mongo configuration found');
        //     }
        //
        //     if (!mongoConfig.uri) {
        //         return new Error('No Mongo URI found in configuration');
        //     }
        //
        //     var userPass;
        //     if (mongoConfig.user || mongoConfig.pass) {
        //         userPass = {
        //             user : mongoConfig.user,
        //             pass : decryptor.decypt(mongoConfig.pass)
        //         }
        //     }
        //     mongoose.connect(mongoConfig.uri, userPass);
        // }

        /**
         * Express configuration.
         *
         */
        app.set('port', config.server.port || 8100);
        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // serve web app
        app.use(express.static(__dirname + '/..' + '/my-app/dist/my-app'));
        // app.use('/api', require('./routes/main-router'));

        // my-app/dist/my-app
        /**
         * Error Handler.
         */
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(err.status || 500).json({ message: err.message })
        });

        /**
         * Start Express web-server.
         */
        http.createServer(app).listen(app.get('port'), callback);

    });
};

module.exports.start = async function() {
  return new Promise((resolve, reject) => {
    /**
     * Create Express web-server.
     */
    const app = express();
  })

}

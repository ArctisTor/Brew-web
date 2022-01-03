var config = exports,
  fs = require('fs'),
  async = require('async'),
  log = require('../util/log'),
  lastConfig;


config.get = async function () {
  return new Promise((resolve, reject) => {
    try {
      if (lastConfig) {
        resolve(lastConfig)
      } else {
        lastConfig = fs.readFileSync(__dirname + '\\appconfig.json');
        lastConfig = JSON.parse(lastConfig);
        resolve(lastConfig);
      }
    } catch (error) {
      console.error(error);
      log.error(error);
      reject(lastConfig || error)
    }
  })
}

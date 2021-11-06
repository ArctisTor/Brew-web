const express = require('express'),
  mainRouter = express.Router();

let brewRouter = require('./brew-router')

mainRouter.use('/brew', brewRouter);

module.exports = mainRouter;

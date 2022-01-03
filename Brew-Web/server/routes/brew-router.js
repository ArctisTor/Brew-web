const express = require('express');


var router = express.Router(),
  brewService = require('../services/BrewService')

router.get('/query', brewService.queryBreweries);


module.exports = router;

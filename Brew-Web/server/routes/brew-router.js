const express = require('express');


var router = express.Router(),
  brewController = require('../controller/BrewController')

router.get('/query', brewController.queryBreweries);


module.exports = router;

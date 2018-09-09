'use strict'

const express = require('express');
const router = express.Router();

const blockChainController = require('../controllers/blockchain-controller');

const log4j = require('log4js');
const logger = log4j.getLogger('Blockchain');

logger.info("***Execute blockchain-router***");

/**
* List of -> HTTP Methods + Routes + Controller functions
*/

router.post('/blockpersist',blockChainController.blockpersist);


module.exports = router;
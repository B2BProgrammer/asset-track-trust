'use strict'

const express = require('express');
const router = express.Router();

const userController = require('../controllers/upload-controller');

const log4j = require('log4js');
const logger = log4j.getLogger('upload');

logger.info("***Execute upload-router***");

/**
 * List of -> HTTP Methods + Routes + Controller functions
 */

router.post('/unstructureddata',userController.unstructureddata);

module.exports = router;
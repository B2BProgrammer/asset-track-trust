'use strict'

const express = require('express');
const router = express.Router();
var myParser = require("body-parser");
const userController = require('../controllers/user-controller');

const log4j = require('log4js');
const logger = log4j.getLogger('user-info');

logger.info("***Execute todo-router***");

/**
 * List of -> HTTP Methods + Routes + Controller functions
 */

 /**
  * Notes to Use this PATH :
  *  Verb : POST
  *  URL :  localhost:3000/login
  *   
  * Body : xformed:-urlend
  * Eg :
  * username : ajithajjarni
  * password : password12343254567
  * 
  */
router.use(myParser.urlencoded({extended : true}));
router.post('/login',userController.login);

/* router.post('/login',function(request, response) {
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)
 });
 */

module.exports = router;
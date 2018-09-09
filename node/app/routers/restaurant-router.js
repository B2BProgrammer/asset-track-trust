'use strict'

const express = require('express');
const router = express.Router();
var myParser = require("body-parser");
const restaurantController = require('../controllers/restaurant-controller');

const log4j = require('log4js');
const logger = log4j.getLogger('nodejs-application');

logger.info("***Execute restaurant-router***");

/**
 * List of -> HTTP Methods + Routes + Controller functions
 */
router.use(myParser.urlencoded({extended : true}));
router.post('/restaurantInfo', restaurantController.postrestaurantInfo);
router.put('/restaurantInfo',restaurantController.putrestaurantInfo);
router.get('/restaurantInfo',restaurantController.getallrestaurants);
router.get('/restaurantInfo/:restaurant_id',restaurantController.getrestaurantInfo);
router.delete('/restaurantInfo/:restaurant_id',restaurantController.deleterestaurant);



/* router.post('/login',function(request, response) {
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)
 });
 */

module.exports = router;
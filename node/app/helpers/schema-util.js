'use strict'
var restaurantEg = require('../../data/restaurants.json');
var generateSchema = require('generate-schema');

var restaurantSchema = generateSchema.mongoose(restaurantEg.restaurant);
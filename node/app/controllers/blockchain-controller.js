var log4js = require('log4js');
var logger = log4js.getLogger('TODO-API');

var constants = require("../../constants.js");
var config = require('../config/config.js');
var dbutil = require('../helpers/db-util.js');

var http = require('http');



/**
 * Implementation Logic : 
 * URL : /todo
 * METHOD : POST 
 * 
 *  Post all the todo ids & description to MongoDB
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.blockpersist = async function (req, res) {
    logger.info("*** Execute todo-controller : todo function ***");
    console.log("Entered blockpersist");

    

   
};



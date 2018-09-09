var log4js = require('log4js');
var logger = log4js.getLogger('USER-API');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var joi = require('joi');

var constants = require("../../constants.js");
var config = require('../config/config.js');
var dbutil = require('../helpers/db-util.js');



/**
 * /login : implementation logic
 * URL : /login
 * METHOD : POST 
 *
 * - supplied password is hashed
 * - jwt token generated for successful login & sent as response to login + 200[Status]
 * - Unsucessful login responded with custom Error message + 401[Status]
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.login = async function(req, res){
    logger.info("*** Execute user-controller : login function ***") ;
 
  var username = req.body.username;
  var password = req.body.password;
   
  let errorMsg = { "status": "ERROR", "detail": "UserName & Password is required" };
  
    //1.Validation/Vetting of external input
    if (!username || !password) {
        errorMsg.detail = "username and password are required";
        return res.status(401).send(errorMsg);
    }
  
    //2. Hashing the password :  
    let hashedPassword = bcrypt.hashSync(password, 8);    
      
    //3. Creation of parameters for DB CREATE Call
    const dbName = constants.DBNAME;
    const collectionName = constants.COLLUSER;
    var vJson = {};
    vJson.username = username;
    vJson.hashedPassword = hashedPassword;
    
    //4. Save/Persist - username & password into mongoDB
    await dbutil.dbCreateSingle(dbName, collectionName, vJson);    
  
    //5. generate token & send to REST URL
    try {
      // create a token
      let token = jwt.sign(hashedPassword, config.secret);
      logger.info("Token Generated prior to DB persist : ",token);
  
      let response = {
            "token": token
       };
       return res.status(200).send(JSON.stringify(response)) 
  
    } catch (error) {
        logger.error("Error while login", error);
        errorMsg.detail = "Not Authorized";
        return res.status(401).send(errorMsg)
    }
};
'use strict';


const express = require('express');
const subpath = express();
const app = express();  // Initialze the App
const swagger = require('swagger-node-express').createNew(subpath);


//const config = require('config');
const log4j = require('log4js');
const logger = log4j.getLogger('nodejs-application');


const path = require('path');
const fileUpload = require('express-fileupload');
const audit = require('express-requests-logger');

const bodyparser = require('body-parser');


const Promise = require('promise');

const http = require('http');
const constants = require('./constants.js');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3000';


// Using mongoose for DB connection verification
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/asset-track-trust-db');
let dbconnection = mongoose.connection;

//check the connection
dbconnection.once('open', function(){
    console.log('connected to mongoDB')
});

/* //check for DB error
dbconnection.on(error,function(err){
    console.log(error);
})
 */


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))


console.log("*** Start the Node Application : App ***") ;

/**
 * Access all the routes from app.js
 */

const learnapi = require('./app/routers/learn-router');
app.use(learnapi); 

const userapi = require('./app/routers/user-router');
app.use(userapi);

const todoapi = require('./app/routers/todo-router');
app.use(todoapi);

const uploadapi = require('./app/routers/upload-router');
app.use(uploadapi); 

const restaurantapi = require('./app/routers/restaurant-router');
app.use(restaurantapi); 

const blockChainapi = require('./app/routers/blockchain-router');
app.use(blockChainapi);

const docs_handler = express.static(__dirname + '/app/public/dist');
swagger.setAppHandler(app);


http.createServer(app).listen(3000, function() {
    logger.info('****************** SERVER STARTED ************************');
    logger.info('**************  http://' + host + ':' + port + '******************');    
   // webSocketService.initialize(server);
});





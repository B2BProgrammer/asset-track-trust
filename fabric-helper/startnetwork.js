var log4j = require('log4js');
var logger = log4j.getLogger('Start Network');
var express = require('express');
var app = express();
var session = require('express-session');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');
var cors = require('cors');



var hfc = require('fabric-client');
var helper = require('./helper.js');
var createChannel = require('./create-channel.js');
var joinChannel = require('./join-channel.js');
var installChainCode = require('./install-chaincode.js');
var instantiateChainCode = require('./instantiate-chaincode.js');
var invokeChainCode = require('./invoke-chaincode.js');
var queryChainCode = require('./query-chaincode.js');




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
module.exports.todo = async function (req, res) {
    logger.info("*** Execute todo-controller : todo function ***");
    var todoId = req.body.todoId;
    var description = req.body.description;

    let errorMsg = {
        "status": "ERROR",
        "detail": "todoId & description is required"
    };

    //1.Validation/Vetting of external input
    if (!todoId || !description) {
        errorMsg.detail = "todo and description are required";
        return res.status(401).send(errorMsg);
    }

    //2. Save/Persist - todoId & description into mongoDB
    try {
        const dbName = constants.DBNAME;
        const collectionName = constants.TODOCOLL;
        var vJson = {
            "todoId": todoId,
            "description": description
        };

        await dbutil.dbCreateSingle(dbName, collectionName, vJson);
        let response = {
            "todoId": todoId,
            "description": description
        };
        return res.status(200).send(JSON.stringify(response));
    } catch (error) {
        logger.error("Could not save todo", error);
        errorMsg.detail = "Could not save todo";
        return res.status(500).send(errorMsg)
    }
};



/**
 * Implementation Logic : 
 * URL : /todo/{todoId} 
 * METHOD : GET 
 * 
 * Get the required todo id & description from MongoDB
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getTodoId = async function (req, res) {
    console.log("*** Execute todo-controller : getTodoId function ***");

    // 1. Get the todoId from the req params
    var todoId = req.params.todoId;

    //2. use todoId to get the description from mongoDB
    try {
        const dbName = constants.DBNAME;
        const collectionName = constants.TODOCOLL;
        var qJSON = {};
        qJSON.todoId = todoId;

        var dbres = await dbutil.dbRead(dbName, collectionName, qJSON);
        console.log(dbres);

        let response = {
            "todoId": todoId,
            // "description" : description
        };
        return res.status(200).send(JSON.stringify(response));
    } catch (error) {
        logger.error("Not found", error);
        errorMsg.detail = "Not found";
        return res.status(404).send(errorMsg)
    }
};



/**
 * Implementation Logic : 
 * URL : /todo/{todoId} 
 * METHOD : DELETE 
 * 
 * Delete the specified todo id & description from MongoDB
 * 
 * @param {*} req 
 * @param {*} res 
 */

module.exports.deleteTodoId = async function (req, res) {
    console.log("*** Execute todo-controller : deleteTodoId function ***");

    // 1. Get the todoId from the req params
    var todoId = req.params.todoId;

    //2. use todoId to find the document & delete from mongoDB
    try {
        const dbName = constants.DBNAME;
        const collectionName = constants.TODOCOLL;
        var qJSON = {};
        qJSON.todoId = todoId;

        await dbutil.dbDelete(dbName, collectionName, qJSON);

        //await dbutil.dbdeleteToDopersist(todoId);        
        let response = {
            "todoId": todoId
        };
        return res.status(200).send(JSON.stringify(response));
    } catch (error) {
        logger.error("Could not delete", error);
        errorMsg.detail = "Could not delete";
        return res.status(500).send(errorMsg)
    }
};
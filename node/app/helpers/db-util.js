'use strict'

var config = require('../config/config.js');
var MongoClient = require('mongodb').MongoClient;

const url = config.url; //mongodb://localhost:27017/
const log4j = require('log4js');
const logger = log4j.getLogger('APP-DB');

/**
 * DB Utility 
 * Functionality : Persist the single document into to MongoDB
 * 
 * @param {*} dbName 
 * @param {*} collectionName 
 * @param validatedJSONPayload
 */
module.exports.dbCreateSingle = async function (dbName, collectionName, validatedJSONPayload) {

    try {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                logger.error("DB Connection Error + dbName :", er, dbName);
            } else {
                var dbo = db.db(dbName);
                dbo.createCollection(collectionName, function (err, res) {
                    if (err) {
                        logger.error("collection", collectionName, "Error :", Error, "For DB", dbName);
                    } else {
                        dbo.collection(collectionName).insertOne(validatedJSONPayload, function (err, res) {
                            if (err) {
                                logger.error("Error while inserting data");
                            } else {
                                logger.info("SUCCESS data inserted");
                                db.close();
                            }
                        })
                    }
                });
            }
        })
    } catch (error) {
        logger.error("Error while inserting data");
        db.close();
    }
}


/**
 * DB Utility 
 * Functionality : Persist the single document into to MongoDB
 * 
 * @param {*} dbName 
 * @param {*} collectionName 
 * @param validatedJSONPayload
 */
module.exports.dbCreateBulk = async function (dbName, collectionName, validatedJSONPayload) {

    try {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                logger.error("DB Connection Error + dbName :", er, dbName);
            } else {
                var dbo = db.db(dbName);
                dbo.createCollection(collectionName, function (err, res) {
                    if (err) {
                        logger.error("collection", collectionName, "Error :", Error, "For DB", dbName);
                    } else {
                        dbo.collection(collectionName).insertMany(validatedJSONPayload, function (err, res) {
                            if (err) {
                                logger.error("Error while inserting data");
                            } else {
                                logger.info("SUCCESS data inserted - Count :", res.insertedCount);
                                db.close();
                            }
                        })
                    }
                });
            }
        })
    } catch (error) {
        logger.error("Error while inserting data");
        db.close();
    }
}


/**
 * DB Utility 
 * Functionality : Read the single document from the MongoDB
 * 
 * @param {*} dbName 
 * @param {*} collectionName 
 * @param validatedJSONPayload
 */
module.exports.dbRead = async function (dbName, collectionName, queryJson) {
    try {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            dbo.collection(collectionName).find(queryJson).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                console.log(result);
               // return result;
            });
        })
    } catch (error) {
        logger.error("Error while retreiving data");
        db.close();
    }
}




/**
 * DB Utility 
 * Functionality : delete the from the MongoDB
 * 
 * @param {*} dbName 
 * @param {*} collectionName 
 * @param validatedJSONPayload
 */
module.exports.dbDelete = async function (dbName, collectionName, queryJson) {
    try {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            dbo.collection(collectionName).deleteMany(queryJson, function (err, obj) {
                if (err) throw err;
                db.close();                
            });
        })
    } catch (error) {
        logger.error("Error while deleting data");
        db.close();
    }
}

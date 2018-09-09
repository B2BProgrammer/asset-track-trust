'use strict'

var config = require('../config/config.js');
var MongoClient = require('mongodb').MongoClient;

const url = config.url; //mongodb://localhost:27017/
const log4j = require('log4js');
const loggger = log4j.getLogger('APP-DB');

/**
 * DB Utility 
 * Functionality : Persist the user-infomation to MongoDB
 * 
 * @param {*} username 
 * @param {*} hashpassword 
 */
module.exports.dbpersist = async function(username, hashpassword){

    var userpayload = { "username": username,
                  "hashpassword":hashpassword};

    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        var dbo = db.db("boot-node-db");
        console.log("*****Created DB************ ")

        dbo.createCollection("userinfo", function(err, res) {
            if (err) throw err;
            db.close();
        });
        console.log("*****Created Collection ************ ")
    
        dbo.collection("userinfo").insertOne(userpayload, function(err, res) {
            if (err) throw err;
            console.log("userInfo data was inserted");
            db.close();
          }); 
    })
}

/**
 * DB Utility 
 * Functionality : Persist the to-do informatoin to MongoDB
 * 
 * @param {*} todoId 
 * @param {*} description 
 */
module.exports.dbtodopersist = async function(todoId,description){

    var todopayload = { "todoId": todoId,
                  "description": description};

    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        var dbo = db.db("boot-node-db");
        console.log("*****Created DB************ ")

        dbo.createCollection("todo", function(err, res) {
            if (err) throw err;
            db.close();
        });
        console.log("*****Created Collection ************ ")
    
        dbo.collection("todo").insertOne(todopayload, function(err, res) {
            if (err) throw err;
            console.log("todo data was inserted");
            db.close();
          }); 
    })
}


/**
 * DB Utility 
 * Functionality : get the to-do informatoin from MongoDB
 * 
 * @param {*} todoId  
 */

module.exports.dbgetToDopersist = async function(todoId){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("boot-node-db");
                  
    var query = { todoId: todoId };
    dbo.collection("todo").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        var description = result[0].description;
        console.log("description in :", description);
        return description;
       });
    });
}


/**
 * DB Utility 
 * Functionality : delete the specific to-do informatoin from MongoDB
 * 
 * @param {*} todoId  
 */
module.exports.dbdeleteToDopersist = async function(todoId){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("boot-node-db");
                  
    var myquery = { todoId: todoId };
    dbo.collection("todo").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
      });
    });
}


/**
 * DB Utility 
 * Functionality : persist the csv to json converted data to MongoDB
 * 
 * @param {*} todoId  
 */
module.exports.dbUnstructpersist = async function(jsonArray){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("boot-node-db");
      
        dbo.collection("csvtojson").insertMany(jsonArray, function(err, res) {
          if (err) throw err;
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
        });
      });
}
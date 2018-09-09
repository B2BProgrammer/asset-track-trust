const csvtojson = require('csvtojson');
const csvFilePath = 'file:///home/blockchain/LocalWorkspace/bootcamp/boot-node-app/node/app/controllers/test.csv';

var dbutil = require('../helpers/db-util.js');

var fs = require('fs');
var constants = require("../../constants.js");
var config = require('../config/config.js');
var dbutil = require('../helpers/db-util.js');



/**
 * Implementation Logic : 
 * URL : /unstructureddata
 * METHOD : POST 
 * 
 * Parse the specified .csv & convert to .json format & upload to mongoDB
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.unstructureddata = async function(req, res) {
    console.log("*** Execute upload-controller : unstructureddata function ***") ;
   
    //1. Load the CSV file & convert to JSON Array
   /*  var jsonArray = await csvtojson().fromFile(csvFilePath).then(jsonobj) => {
      console.log(jsonArray)
    }; */

    console.log(fs.existsSync(csvFilePath))
   /*  csvtojson().fromFile('/boot-node-app/node/app/controllers').then((jsonObj)=>{
    console.log(jsonObj); // Log the json to the console
    }) */

   //1.a Mocked up JSON Data - as csvtojson is not working 
   var jsonArray = [
    {
      "firstname": "ajith",
      "lastname": "ajjarani"
    },
    {
      "firstname": "raj",
      "lastname": "Hamsa"
    },
    {
      "firstname": "div",
      "lastname": "naresh"
    },
    {
      "firstname": "rakesh",
      "lastname": "naresh"
    },
    {
      "firstname": "mike",
      "lastname": "blockchain"
    },
    {
      "firstname": "jamie",
      "lastname": "el"
    }
  ];

   // 2. Persist the JSON Array to MongoDB    
    try {                   
        //3. Creation of parameters for DB CREATE Call
        const dbName = constants.DBNAME;
        const collectionName = constants.CSVJSON;        
        
        //4. Save/Persist - username & password into mongoDB
        await dbutil.dbCreateBulk(dbName, collectionName, jsonArray);    

       // await dbutil.dbUnstructpersist(jsonArray);
        let response = {
            "save": "Success"            
        };
        return res.status(200).send(JSON.stringify(response));     
    } catch (error) {
        logger.error("Could not save json file", error);
        errorMsg.detail = "Could not save json file";
        return res.status(500).send(errorMsg)
    }
};
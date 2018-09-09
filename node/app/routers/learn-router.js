'use strict'

const express = require('express');
const router = express.Router();
//const learnController = require('../controllers/learn-controller');
const log4j = require('log4js');
const logger = log4j.getLogger('nodejs-application');

logger.info("***Execute learn-router***");


/**
 * Below Routes are for understanding purpose
 */
router.get('/',(req, res) => {
    res.send('Hello world from Router : express');
}); 


router.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

router.get('/api/courses/:id', (req, res) =>{
res.send(req.params.id);
});

 router.get('/test/:id', function(req, res, next){
     res.render('test',{output: req.params.id})
 })

module.exports = router;
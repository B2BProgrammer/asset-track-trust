'use strict'

const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo-controller');

const log4j = require('log4js');
const logger = log4j.getLogger('TO-DO');

logger.info("***Execute todo-router***");

/**
* List of -> HTTP Methods + Routes + Controller functions
*/

router.post('/todo',todoController.todo);
router.get('/todo/:todoId', todoController.getTodoId);
router.delete('/todo/:todoId',todoController.deleteTodoId);

module.exports = router;
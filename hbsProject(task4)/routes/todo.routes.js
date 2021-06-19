const express = require('express')
const router = new express.Router()
const todoController = require('../controller/tasks.controller')

router.get('', todoController.showAllTasks);
router.get('/addTask', todoController.addTaskView);
router.post('/addTask', todoController.addTaskPOST);
router.get('/showSingle/:id', todoController.showSingleTask);
// router.get('/editTask/:id', todoController.editTask)
router.get('/deleteTask/:id', todoController.deleteTask);

module.exports=router
const express = require('express')
const router= new express.Router()
const teacherController = require('../controller/teacher.controller')


router.post('/register', teacherController.register);
router.get('/all', teacherController.showAll);
router.get('/all/:id', teacherController.showSingle);
router.delete('/all/:id', teacherController.deleteSingle);

module.exports=router
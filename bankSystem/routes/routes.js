const express = require('express');
const router = new express.Router();
const userController = require('../controller/user.controller');
const operationsController = require('../controller/operations.controller');

// router.get('', (req,res)=>{res.render('operations/home')});
router.get('/allUsers', userController.showAllUsers);
router.get('/login', userController.LoginView);
router.post('/login', userController.LoginPOST);
router.get('/addUser', userController.addUserView);
router.post('/addUser', userController.addUserPOST);
router.get('/showSingleUser/:id', userController.showSingleUser);
router.get('/editUser/:id', userController.editUserView);
router.post('/editUser/:id', userController.editUserPOST);
router.get('/deleteUser/:id', userController.deleteUser);
/******************** */

router.get('/add', operationsController.addView);
router.post('/add', operationsController.addPOST);
router.get('', operationsController.showSummary);
router.get('/operationDetails/:id', operationsController.showoperationDetails);
router.get('/deleteOperation/:id', operationsController.deleteOperation);
router.get('/editOperation/:id', operationsController.editoperationView);
router.post('/editOperation/:id', operationsController.editoperationPOST);

// router.get('/s',(req,res)=>{
//     req.session.id=1;
//     res.send(req.session.id);
// })

module.exports=router
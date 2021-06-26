const express = require("express");
const router = new express.Router();

const auth=require('../middlewares/auth');
const userController = require("../controllers/user.controller");

router.post("/register", userController.create);
router.post("/login", userController.login);
router.patch("/activate", userController.activate);
router.patch("/deactivate",auth.userAuth, userController.deactivate);
router.post("/logout",auth.userAuth, userController.logout);
router.get("/profile",auth.userAuth, userController.showProfile);
router.get("/allUsers",auth.userAuth, userController.showAll);/**adminAuth will be add after admin contoller*/
router.patch("/edit",auth.userAuth, userController.edit);
router.delete("/delete",auth.userAuth, userController.remove);

module.exports = router;

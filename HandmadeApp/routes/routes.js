const express = require("express");
const router = new express.Router();

const auth=require('../middlewares/auth');
const userController = require("../controllers/user.controller");
const commonUserController = require("../controllers/commonUser.controller");
const adminController = require("../controllers/admin.controller");
/**User routes */
router.post("/register", userController.create);
router.post("/login", userController.login);
router.patch("/activate", userController.activate);
router.patch("/resetPassword", userController.forgotPassword);

router.patch("/deactivate",auth.userAuth, commonUserController.deactivate);
router.post("/logout",auth.userAuth, commonUserController.logout);
router.post("/logoutAllDevices",auth.userAuth, commonUserController.logoutAllDevices);
router.get("/profile",auth.userAuth, commonUserController.showProfile);
router.patch("/edit",auth.userAuth, commonUserController.edit);
router.patch("/editPassword",auth.userAuth, commonUserController.editPassword);
router.delete("/delete",auth.userAuth, commonUserController.remove);

/**Admin routes */
router.post("/admin/register", adminController.create);
router.post("/admin/login", adminController.login);
router.patch("/admin/activate", adminController.activate);
router.patch("/admin/resetPassword", adminController.forgotPassword);

router.patch("/admin/deactivate",auth.adminAuth, commonUserController.deactivate);
router.post("/admin/logout",auth.adminAuth, commonUserController.logout);
router.post("/admin/logoutAllDevices",auth.adminAuth, commonUserController.logoutAllDevices);
router.get("/admin/profile",auth.adminAuth, commonUserController.showProfile);
router.patch("/admin/edit",auth.adminAuth, commonUserController.edit);
router.patch("/admin/editPassword",auth.adminAuth, commonUserController.editPassword);
router.delete("/admin/delete",auth.adminAuth, commonUserController.remove);

router.get("/admin/allUsers",auth.adminAuth, userController.showAll);
router.delete("/admin/deleteUser/:id",auth.adminAuth, userController.removeUser);

/**Super Admin routes */
router.get("/admin/allAdmins",auth.superAdminAuth, adminController.showAll);
router.delete("/admin/deleteAdmin/:id",auth.superAdminAuth, adminController.removeAdmin);
router.patch("/admin/makeSuperAdmin/:id",auth.superAdminAuth, adminController.makeSuperAdmin);


module.exports = router;

const express = require("express");
const router = new express.Router();

const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controller");
const commonUserController = require("../controllers/commonUser.controller");
const adminController = require("../controllers/admin.controller");
const categoryController = require("../controllers/category.controller");
const productController = require("../controllers/product.controller");
const reservationController = require("../controllers/reservation.controller");

/**User routes */
router.post("/register", userController.create);
router.post("/login", userController.login);
router.patch("/activate", userController.activate);
router.patch("/resetPassword", userController.forgotPassword);

router.patch("/deactivate", auth.userAuth, commonUserController.deactivate);
router.post("/logout", auth.userAuth, commonUserController.logout);
router.post(
  "/logoutAllDevices",
  auth.userAuth,
  commonUserController.logoutAllDevices
);
router.get("/profile", auth.userAuth, commonUserController.showProfile);
router.patch("/edit", auth.userAuth, commonUserController.edit);
router.patch("/editPassword", auth.userAuth, commonUserController.editPassword);
router.delete("/delete", auth.userAuth, commonUserController.remove);

/**Admin routes */
router.post("/admin/register", adminController.create);
router.post("/admin/login", adminController.login);
router.patch("/admin/activate", adminController.activate);
router.patch("/admin/resetPassword", adminController.forgotPassword);

router.patch(
  "/admin/deactivate",
  auth.adminAuth,
  commonUserController.deactivate
);
router.post("/admin/logout", auth.adminAuth, commonUserController.logout);
router.post(
  "/admin/logoutAllDevices",
  auth.adminAuth,
  commonUserController.logoutAllDevices
);
router.get("/admin/profile", auth.adminAuth, commonUserController.showProfile);
router.patch("/admin/edit", auth.adminAuth, commonUserController.edit);
router.patch(
  "/admin/editPassword",
  auth.adminAuth,
  commonUserController.editPassword
);
router.delete("/admin/delete", auth.adminAuth, commonUserController.remove);

router.get("/admin/allUsers", auth.adminAuth, userController.showAll);
router.delete(
  "/admin/deleteUser/:id",
  auth.adminAuth,
  userController.removeUser
);

/**Super Admin routes */
router.get("/admin/allAdmins", auth.superAdminAuth, adminController.showAll);
router.delete(
  "/admin/deleteAdmin/:id",
  auth.superAdminAuth,
  adminController.removeAdmin
);
router.patch(
  "/admin/makeSuperAdmin/:id",
  auth.superAdminAuth,
  adminController.makeSuperAdmin
);

/**category routes */
router.post("/addCategory", auth.adminAuth, categoryController.create);
router.get("/allCategories", categoryController.showAll);
router.patch("/editCategory/:id", auth.adminAuth, categoryController.edit);
router.delete("/deleteCategory/:id", auth.adminAuth, categoryController.remove);

/**product routes */
router.post("/addProduct", auth.adminAuth, productController.create);
router.get("/product/:id", productController.showProduct);
router.get("/", productController.showAll);
router.get("/category/:id", productController.showByCategory);
router.patch("/editProduct/:id", auth.adminAuth, productController.edit);
router.patch("/makeOffer/:id", auth.adminAuth, productController.makeOffer);
router.patch("/endOffer/:id", auth.adminAuth, productController.endOffer);
router.delete("/deleteProduct/:id", auth.adminAuth, productController.remove);

/**reservation routes */
router.post("/reserveProduct/:id", auth.userAuth, reservationController.create);
router.get("/showReservation/:id", auth.adminAuth, reservationController.show);
router.get("/adminHome", auth.adminAuth, reservationController.showAll);
router.patch("/editRservation/:id",auth.userAuth,reservationController.edit);
router.patch("/cancelReservation/:id",auth.userAuth,reservationController.cancel);
router.patch("/orderStatus/:id",auth.adminAuth,reservationController.updateStatus);
router.patch("/setMakerl/:id",auth.adminAuth,reservationController.setMaker);



module.exports = router;

const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
  try {
    let admin = new Admin(req.body);
    admin.accountActivation = await bcrypt.hash("activate", 12);
    admin.forgotPassword = await bcrypt.hash("forgotPassword", 12);
    await admin.save();
    res.status(200).send({
      status: true,
      message: "admin added",
      data: { admin },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e,
      message: "admin addition error",
    });
  }
};

const activate = async (req, res) => {
  try {
    if (!req.query.email || !req.query.activationKey)
      return res.send("invalid url");
    const admin = await Admin.findOne({
      email: req.query.email,
    });
    if (!admin) return res.send("admin not found");
    if (admin.accountStatus) return res.send("already activated");
    admin.accountStatus = true;
    admin.accountActivation = null;

    await admin.save();

    res.status(200).send("successfully activated");
  } catch (e) {
    res.status(500).send("activation error!");
  }
};

const login = async (req, res) => {
  try {
    const admin = await Admin.logMeOn(req.body.email, req.body.password);
    console.log(admin);
    if (admin.accountActivation)
      return res.send(
        "you must activate your account with activation link that sent to your mail"
      );
    if (!admin.accountStatus) admin.accountStatus = true;
    const token = await admin.generateAuthToken();

    res.status(200).send({
      status: true,
      data: { admin },
      message: "logged in",
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      data: e.message,
      message: "error in log in",
    });
  }
};

const showAll = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).send(admins);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    if (!req.query.email || !req.query.forgotPasswordKey)
      res.send("invalid url");
    const admin = await Admin.findOne({
      email: req.query.email,
    });
    if (!admin) return res.send("admin not found");
    if (!req.body.newPassword || !req.body.confirmPassword)
      return res.send("there is missing feilds!");
    if (req.body.newPassword !== req.body.confirmPassword)
      return res.send("new password does not match with confirm password!");
    admin.password = req.body.newPassword;
    await admin.save();
    res.status(200).send({
      message: "password updated",
      status: true,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const removeAdmin = async (req, res) => {
  try {
    let id = req.params.id;
    // let admin =await Admin.findOne({_id:id});
    // if(admin.adminRole)return res.send('super admin can not be removed');
    await Admin.findByIdAndDelete(id);
    res.status(200).send("removed");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const makeSuperAdmin = async (req, res) => {
  try {
    let id = req.params.id;
    if(id==req.user._id)return res.send('you can not remove yourself');
    let admin=await Admin.findOne({_id:id});
    if(!admin) return res.send('admin not found!')
    admin.adminRole=true;
    await admin.save();
    res.status(200).send("admin has become a super admin");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

module.exports = {
  create,
  activate,
  login,
  showAll,
  forgotPassword,
  removeAdmin,
  makeSuperAdmin,
};

const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const create = async (req, res) => {
  try {
    let user = new User(req.body);
    user.accountActivation = await bcrypt.hash("activate", 12);
    user.forgotPassword = await bcrypt.hash("forgotPassword", 12);
    await user.save();
    res.status(200).send({
      status: true,
      message: "user added",
      data: { user },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e.message,
      message: "user addition error",
    });
  }
};

const activate = async (req, res) => {
  try {
    if (!req.query.email || !req.query.activationKey)
      return res.send("invalid url");
    const user = await User.findOne({
      email: req.query.email,
    });
    if (!user) return res.send("user not found");
    if (user.accountStatus) return res.send("already activated");
    user.accountStatus = true;
    user.accountActivation = null;

    await user.save();

    res.status(200).send("successfully activated");
  } catch (e) {
    res.status(500).send("activation error!");
  }
};

const login = async (req, res) => {
  try {
    const user = await User.logMeOn(req.body.email, req.body.password);
    if (user.accountActivation)
      return res.send(
        "you must activate your account with activation link that sent to your mail"
      );
    if (!user.accountStatus) user.accountStatus = true;
    const token = await user.generateAuthToken();
    res.status(200).send({
      status: true,
      data: { user },
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
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    if (!req.query.email || !req.query.forgotPasswordKey)
      res.send("invalid url");
    const user = await User.findOne({
      email: req.query.email,
    });
    if (!user) return res.send("user not found");
    if (
      !req.body.newPassword ||
      !req.body.confirmPassword
    )
      return res.send("there is missing feilds!");
      if (req.body.newPassword !== req.body.confirmPassword)
      return res.send("new password does not match with confirm password!");
    user.password = req.body.newPassword;
    await user.save();
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

const removeUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user=await User.findByIdAndDelete(id);
    res.status(200).send("removed");
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
  removeUser,
};

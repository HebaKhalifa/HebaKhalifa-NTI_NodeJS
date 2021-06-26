const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const helper = require("../helpers/helpers");

const create = async (req, res) => {
  try {
    let user = new User(req.body);
    user.accountActivation = await bcrypt.hash("activate", 12);
    await user.save();
    res.status(200).send({
      status: true,
      message: "user added",
      data: { user },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e,
      message: "user addition error",
    });
  }
};

const generateActivationLink = () => {
  let user = req.user;
  return (
    "/activateUser?email=" +
    user.email +
    "&activationKey=" +
    user.accountActivation
  );
};

const activate = async (req, res) => {
  try {
    if (!req.query.email || !req.query.activationKey) res.send("invalid url");
    const user = await User.findOne({
      email: req.query.email,
    });

    if (user.accountStatus) res.send("already activated");
    user.accountStatus = true;
    user.accountActivation = null;

    await user.save();

    res.status(200).send("successfully activated");
  } catch (e) {
    res.status(500).send("activation error!");
  }
};

const deactivate = async (req, res) => {
  try {
    req.user.accountStatus = false;
    await req.user.save();
    res.status(200).send("deactivated");
  } catch (e) {
    res.status(200).send("deactivation error");
  }
};

const login = async (req, res) => {
  try {
    const user = await User.logMeOn(req.body.email, req.body.password);
    if (user.accountActivation)
      res.send(
        "you must activate your account with activation link that sent to your mail"
      );
    else if (!user.accountStatus) user.accountStatus = true;
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

const logout = async (req, res) => {
  try {
    let index = req.user.tokens.findIndex((item) => item.token == req.token);
    req.user.tokens.splice(index, 1);
    await req.user.save();
    res.status(200).send("log out");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const logoutAllDevices = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("log out");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const showProfile = (req, res) => {
  res.send(req.user);
};

const showAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const edit = async (req, res) => {
  let updates=helper.checkValidUpdates(req, res);
  try {
    updates.forEach((update) => {
      if(update=='email'){
        // helper.verifyEmail(req,res);
        // continue;
      } 
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.status(200).send({
      message: "updated",
      status: true,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const remove = async (req, res) => {
  try{    
    await req.user.remove()
    res.status(200).send('removed');
}
catch(e){
  res.status(500).send({
    status:false,
    message:e.message
  })
}
};

module.exports = {
  create,
  generateActivationLink,
  activate,
  deactivate,
  login,
  logout,
  logoutAllDevices,
  showProfile,
  showAll,
  edit,
  remove,
};

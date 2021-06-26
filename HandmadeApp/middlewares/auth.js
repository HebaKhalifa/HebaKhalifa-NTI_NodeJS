const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");

function authunticateAccount(req, res, next, account, token) {
  if (!account) throw new Error();
  req.user = account;
  req.token = token;
  console.log(account);
  next();
}

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });
    authunticateAccount(req, res, next, user, token);
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e.message,
      message: "unauthorized",
    });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    const admin = await Admin.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });
    authunticateAccount(req, res, next, admin, token);
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e.message,
      message: "unauthorized",
    });
  }
};

const superAdminAuth = async (req, res, next) => {
  adminAuth();
  if (req.user.adminRole) {
    next();
  } else {
    res.status(500).send({
      status: false,
      error: e.message,
      message: "unsuperAdmin",
    });
  }
};

module.exports = {
  userAuth,
  adminAuth,
  superAdminAuth,
};

const helper = require("../helpers/helpers");

/**common function */
const deactivate = async (req, res) => {
  try {
    if(!req.user.accountStatus) return res.send('deactivated aleady!')
    req.user.accountStatus = false;
    await req.user.save();
    res.status(200).send("deactivated");
  } catch (e) {
    res.status(200).send("deactivation error");
  }
};
/**common function */
const logout = async (req, res) => {
  try {
    let index = req.user.tokens.findIndex((item) => item.token == req.token);
    req.user.tokens.splice(index, 1);
    await req.user.save();
    res.status(200).send({msg:"log out"});
  } catch (e) {
    res.status(500).send(e.message);
  }
};
/**common function */
const logoutAllDevices = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("log out");
  } catch (e) {
    res.status(500).send(e.message);
  }
};
/**common function */
const showProfile = (req, res) => {
  res.send(req.user);
};

/**common function */
const edit = async (req, res) => {
  let updates = helper.checkValidUpdates(req, res);
  try {
    updates.forEach((update) => {
      if (update == "email") {
        helper.verifyEmail(req);
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

/**common function */
const editPassword = async (req, res) => {
  try {
    if (
      !req.body.oldPassword ||
      !req.body.newPassword ||
      !req.body.confirmPassword
    )
      return res.send("there is missing feilds!");
    let oldPassword = req.body.oldPassword;
    let check = await req.user.verifyPassword(oldPassword);
    if (!check) return res.send("password is not correct!");
    if (req.body.newPassword !== req.body.confirmPassword)
      return res.send("new password does not match with confirm password!");
    req.user.password = req.body.newPassword;
    await req.user.save();
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
/**common function */
const remove = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send("removed");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

module.exports = {
  deactivate,
  logout,
  logoutAllDevices,
  showProfile,
  edit,
  editPassword,
  remove,
};

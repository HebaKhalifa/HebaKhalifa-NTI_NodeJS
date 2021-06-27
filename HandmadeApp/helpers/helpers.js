const checkValidUpdates = (req, res) => {
  let allowed = [
    "userName",
    "email",
    "phone",
    "address",
    "paymentMethod",
    "profilePicture",
  ];

  let notAllowed = [];
  let updates = Object.keys(req.body).filter((item) => {
    return allowed.includes(item);
  });
  for (item in req.body) {
    allowed.includes(item) ? updates.push(item) : notAllowed.push(item);
  }

  if (!updates) {
    return res.status(500).send({
      status: false,
      message: "invalid updates",
    });
  } else if (notAllowed.length > 0) {
    return res.status(500).send({
      status: false,
      data: notAllowed,
      message: "not allowed",
    });
  } else {
    return updates;
  }
};

const verifyEmail = async (req, res) => {
  req.user["accountActivation"] = await bcrypt.hash("activate", 12);
  req.user["accountStatus"] = false;
  await user.save();
};

module.exports = {
  checkValidUpdates,
  verifyEmail,
};

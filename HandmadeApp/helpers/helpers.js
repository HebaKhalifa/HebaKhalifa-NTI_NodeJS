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
      message:"not allowed"
    });
  } else {
    return updates;
  }
};

const verifyEmail = async (req, res) => {
  try {
      console.log('**********************************');
      console.log(req.user[accountActivation]);
      req.user.accountActivation = await bcrypt.hash("activate", 12);
      console.log(req.user);
    await user.save();
    res.status(200).send({
      status: true,
      message: "accountActivation is created",
      data: { user },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e,
      message: "accountActivation error",
    });
  }
};

module.exports = {
  checkValidUpdates,
  verifyEmail
};

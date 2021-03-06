const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminSchema = new mongoose.Schema(
  {
    adminRole: { type: Boolean, default: false, required: true },
    userName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invalid email");
      },
    },
    password: { type: String, required: true },
    forgotPassword: { type: String, required: true },
    profilePicture: { type: String, trim: true, default: null },
    phone: { type: String },
    address: { type: String },
    accountStatus: { type: Boolean },
    accountActivation: { type: String, default: "" },
    tokens: [{ token: { type: String } }],
    orders: [
      {
        reservation_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Reservation",
        },
      },
    ],
  },
  { timestamps: true }
);

adminSchema.methods.toJSON = function () {
  let admin = this.toObject();
  hiddinData = ["password"];
  hiddinData.forEach((item) => {
    delete admin[item];
  });
  return admin;
};

adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWTKEY);
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

adminSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.statics.logMeOn = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("invalid email");
  const matchPass = await bcrypt.compare(password, admin.password);
  if (!matchPass) throw new Error("invalid password");
  return admin;
};

adminSchema.pre("remove", async function (next) {
  try {
    admin = this;
    Post.deleteMany({ admin_id: admin._id });
    next();
  } catch (e) {
    throw new error(e);
  }
});

adminSchema.pre("save", async function (next) {
  try {
    admin = this;
    if (admin.isModified("password")) {
      admin.password = await bcrypt.hash(admin.password, 12);
    }
    next();
  } catch (e) {
    console.log(e.message);
  }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;

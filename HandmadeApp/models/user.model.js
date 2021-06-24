const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    userType: { type: Number, enum: [0, 1, 2], required: true },
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
    profilePicture: { type: String , trim:true, default:null},
    phone: { type: String },
    address: { type: String },
    accountStatus: { type: Boolean },
    paymentMethod: { type: String, enum: ["Cash", "Fawry", "Visa"] },
    adminNotes: { type: String, default: "" },
    tokens: [{ token: { type: String } }],
  },
  { timestamps: true }
);

userSchema.virtual("userReservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "user_id",
});

userSchema.methods.toJSON = function () {
  let user = this.toObject();
  hiddinData = ["password"];
  hiddinData.forEach((item) => {
    delete user[item];
  });
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWTKEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.logMeOn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("invalid email");
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) throw new Error("invalid pass");
  return user;
};

userSchema.pre('remove',async function(next){
  try{
      user = this
      Post.deleteMany({user_id:user._id})
      next()
  }
  catch(e){
      throw new error(e)
  }
})

userSchema.pre("save", async function (next) {
  try {
    user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 12);
    }
    next();
  } catch (e) {
    console.log(e.message);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

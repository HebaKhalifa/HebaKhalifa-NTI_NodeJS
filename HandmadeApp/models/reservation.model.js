const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reservation_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "reservation",
    },
    reservationDate: { type: Date, default: new Date() },
    deliveryDate: { type: Date, default: new Date().getDay + 2 },
    status: {
      type: String,
      trim: true,
      default: "reserved",
      enum: ["reserved", "confirmed", "delivering", "deliverd", "done"],
    },
    active: { type: Boolean, default: false },
    deliveryWay: [
      {
        way: {
          type: String,
          enum: ["Post", "Shipping Company", "delivery representative"],
        },
        details:{type:String ,trim:true , default:null}
      },
    ],
  },
  { timestamps: true }
);


const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
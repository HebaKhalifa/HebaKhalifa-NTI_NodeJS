const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    reservationDate: { type: Date, default: new Date() },
    deliveryDate: { type: Date, default: new Date().getDay + 2 },
    status: {
      type: String,
      enum: ["reserved", "confirmed", "delivering", "deliverd", "done"],
      default: "reserved",
      trim: true,
    },
    isDeletedFlag: { type: Boolean, default: false },
    deliveryWay: {
      way: {
        type: String,
        enum: ["Post", "Shipping Company", "delivery representative"],
      },
      cost:{type:Number , required:true},
      deliveringTime: { type: Number, required: true },
      details: { type: String, trim: true, default: null },
    },
    priority: { type: Boolean, default: false, required: true },
    expectedTime: { type: Number, required: true },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;

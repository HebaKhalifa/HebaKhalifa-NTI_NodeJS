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
    maker: {
      admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "Admin",
      },
    },
    confirmationDate: { type: Date },
    deliveryDate: { type: Date },
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
        required: true,
      },
      cost: { type: Number, required: true },
      deliveringTime: { type: Number, required: true },
      details: { type: String, trim: true, default: null },
    },
    quantity: { type: Number, required: true, default: 1 },
    priority: { type: Boolean, default: false, required: true },
    expectedTime: { type: Number, required: true },
    cost: { type: Number, required: true },
  },
  { timestamps: true }
);


const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;

const mongoose = require("mongoose");
const validator = require("validator");
const productSchema = new mongoose.Schema(
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

productSchema.virtual("productReservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "product_id",
});

const product = mongoose.model("product", productSchema);
module.exports = product;

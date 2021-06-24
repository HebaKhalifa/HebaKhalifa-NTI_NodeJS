const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    productName: { type: String, trim: true, default: null },
    discription: { type: String, trim: true, default: null },
    images: [{ type: String, required:true , trim: true, default: null }],
    rates: [{ type: String, trim: true, default: null }],
    reviews: [{ type: String, trim: true, default: null }],
    price: { type: Number, required: true },
    offer: { type: Number },
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

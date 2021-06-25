const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, unique:true, trim: true,required:true},
  },
  { timestamps: true }
);

categorySchema.virtual("categoryProduct", {
  ref: "Product",
  localField: "_id",
  foreignField: "category_id",
});

categorySchema.pre("remove", async function (next) {
  try {
    category = this;
    Reservation.deleteMany({ category_id: category._id });
    next();
  } catch (e) {
    throw new error(e);
  }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

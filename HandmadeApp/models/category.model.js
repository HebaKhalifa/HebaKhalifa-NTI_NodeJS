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



const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

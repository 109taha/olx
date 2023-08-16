const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    product_type: {
      type: String,
      require: true,
      enum: ["Mobile", "Car", "Bike"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};

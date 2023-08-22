const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BikeMaker",
      require: true,
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "BikeModel",
    },
    year: {
      type: Number,
      require: true,
    },
    KMsDriven: {
      type: Number,
      require: true,
    },
    condition: {
      type: String,
      require: true,
      enum: ["New", "Used"],
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: { type: String, require: true },
      coordinates: [],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "City",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isFeaturedData: {
      type: Date,
    },
    pics: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

BikeSchema.pre("save", function (next) {
  if (this.isModified("isFeatured") && this.isFeatured === true) {
    this.isFeaturedData = new Date();
  }
  next();
});

const Bike = mongoose.model("Bike", BikeSchema);

module.exports = {
  Bike,
};

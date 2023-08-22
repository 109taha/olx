const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
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
      require: true,
      ref: "CarMaker",
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "CarModel",
    },
    year: {
      type: Number,
      require: true,
    },
    KMsDriven: {
      type: Number,
      require: true,
    },
    fuel: {
      type: String,
      require: true,
      enum: ["Petrol", "Diesel", "LPG", "CNG", "Hybrid", "Electric"],
    },
    registrationCity: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "CarRegCity",
    },
    documants: {
      type: String,
      require: true,
      enum: ["Original", "Duplicate"],
    },
    assembly: {
      type: String,
      require: true,
      enum: ["Local", "Imported"],
    },
    transmission: {
      type: String,
      require: true,
      enum: ["Automatic", "Manual"],
    },
    features: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "CarFeature",
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
      red: "City",
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
CarSchema.pre("save", function (next) {
  if (this.isModified("isFeatured") && this.isFeatured === true) {
    this.isFeaturedData = new Date();
  }
  next();
});

const Car = mongoose.model("Car", CarSchema);

module.exports = {
  Car,
};

const mongoose = require("mongoose");

const MobilePhoneSchema = new mongoose.Schema(
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
    brand: {
      type: String,
      require: true,
      enum: [
        "Apple",
        "Samsung",
        "Google",
        "OnePlus",
        "Tecno",
        "Infinix",
        "Xiaomi",
        "Realme",
        "Nokia",
        "Motorola",
        "BlackBerry",
        "LG",
        "Asus",
        "Acer",
        "Sony",
        "QMobile",
        "Huawei",
        "Vivo",
        "BLU",
        "Alcatel",
        "ZTE ",
        "Oppo",
        "Micromax",
        "HTC",
        "Honor",
        "Lenovo",
        "Celkon",
        "Philips",
      ],
    },
    condition: {
      type: String,
      require: true,
      enum: ["New", "Used", "Box Open", "Refurbished", "For Parts Not Working"],
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
MobilePhoneSchema.pre("save", function (next) {
  if (this.isModified("isFeatured") && this.isFeatured === true) {
    this.isFeaturedData = new Date();
  }
  next();
});

const Mobile = mongoose.model("Mobile-Phone", MobilePhoneSchema);

module.exports = {
  Mobile,
};

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
      type: String,
      require: true,
      enum: [
        "Honda",
        "Yamaha",
        "Suzuki",
        "United",
        "Road Prince",
        "Unique",
        "Super Power",
        "Super Star",
        "Metro",
        "Crown",
        "Kawasaki",
        "Power",
        "Ravi",
        "Eagle",
        "Habib",
        "Ghani",
        "Sohrab",
        "Benelli",
        "Derbi",
        "Zongshen",
        "CF Moto",
        "Cineco",
        "Qingqi",
        "Hero",
        "Hi Speed",
        "Lifan",
        "Pak Hero",
        "Safari",
        "Super Asia",
        "Toyo",
        "Treet",
        "Union Star",
      ],
    },
    model: {
      type: String,
      require: true,
      enum: [
        "CG 125",
        "CD 70",
        "Pridor",
        "CG 125 Special Edition",
        "CB 150F",
        "YBR 125",
        "YBR 125G",
        "YB 125Z",
        "YB 125Z-DX",
        "Dhoom YD-70",
        "DX-100",
        "4 YD 100",
        "Royale YB 100",
        "YD-100 Junoon",
        "FZ1",
        "Mini 100, Euro II",
        "RX 115",
        "MT-09",
      ],
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
      type: String,
      required: true,
    },
    pics: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

const Bike = mongoose.model("Bike", BikeSchema);

module.exports = {
  Bike,
};

const mongoose = require("mongoose");

const BikeModelSchmea = new mongoose.Schema({
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
});

const BikeModel = mongoose.model("BikeModel", BikeModelSchmea);

module.exports = BikeModel;

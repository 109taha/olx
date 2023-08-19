const mongoose = require("mongoose");

const BikeMakerSchmea = new mongoose.Schema({
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
});

const BikeMaker = mongoose.model("BikeMaker", BikeMakerSchmea);

module.exports = BikeMaker;

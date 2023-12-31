const mongoose = require("mongoose");

const CarMakerSchema = new mongoose.Schema({
  maker: {
    type: String,
    require: true,
    enum: [
      "Suzuki",
      "Toyota",
      "Honda",
      "Daihatsu",
      "Nissan",
      "Adam",
      "Audi",
      "BAIC",
      "Bentley",
      "BMW",
      "Buick",
      "Cadilac",
      "Changan",
      "Chery",
      "Chevrolet",
      "Chrysler",
      "Classic & Antiques",
      "Daewoo",
      "Daihatsu",
      "Datsun",
      "DFSK",
      "Dodge",
      "Dongfeng",
      "FAW",
      "Fiat",
      "Ford",
      "GMC",
      "Haval",
      "Hino",
      "Honda",
      "Hummer",
      "Hyundai",
      "Isuzu",
      "JAC",
      "Jaguar",
      "Jeep",
      "JW Fortland",
      "KIA",
      "Land Rover",
      "Lexus",
      "Mazda",
      "Mercedes",
      "MG",
      "Mitsubishi",
      "Nissan",
      "Peugeot",
      "Porsche",
      "Prince",
      "Proton",
      "Range Rover",
      "Renault",
      "Subaru",
      "Suzuki",
      "Toyota",
      "United",
      "Volkswagen",
      "Other Brands",
    ],
  },
});

const CarMaker = new mongoose.model("CarMaker", CarMakerSchema);

module.exports = CarMaker;

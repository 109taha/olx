const { Product } = require("../models/product");
const { Car } = require("../models/car");
const { Bike } = require("../models/bike");
const { Mobile } = require("../models/mobilePhone");

const findAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({
      data: products,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const findAll = async (req, res, next) => {
  try {
    const bikes = await Bike.find();
    const cars = await Car.find();
    const mobiles = await Mobile.find();
    console.log(bikes, cars, mobiles);
    res.status(200).send({ bikes, cars, mobiles });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
module.exports = { findAllProduct, findAll };

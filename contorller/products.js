const { Product } = require("../models/product");
const { Car } = require("../models/car");
const { Bike } = require("../models/bike");
const { Mobile } = require("../models/mobilePhone");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

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

    res.status(200).send({ bikes, cars, mobiles });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const search = async (req, res, next) => {
  try {
    const searchfield = req.params.title;
    const bikes = await Bike.find({
      title: { $regex: searchfield, $options: "i" },
    });
    const cars = await Car.find({
      title: { $regex: searchfield, $options: "i" },
    });
    const mobiles = await Mobile.find({
      title: { $regex: searchfield, $options: "i" },
    });
    const item = { bikes, cars, mobiles };
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const findnearest = async (req, res) => {
  try {
    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;
    const userData = await User.findById(userId);
    // console.log(userData.location);
    const latitude = userData.location.coordinates[1]; // Latitude is at index 1
    const longitude = userData.location.coordinates[0];

    const option = {
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], 15 / 3962.2],
        },
      },
    };
    const bikes = await Bike.find(option);
    const cars = await Car.find(option);
    const mobiles = await Mobile.find(option);
    const items = { cars, mobiles, bikes };
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
      err,
    });
  }
};
module.exports = { findAllProduct, findAll, search, findnearest };

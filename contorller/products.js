const { Product } = require("../models/product");
const { Car } = require("../models/car/car");
const { Bike } = require("../models/bike/bike");
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
    const bikes = await Bike.find().sort({
      isFeatured: -1,
      createdAt: -1,
    });
    const cars = await Car.find().sort({
      isFeatured: -1,
      createdAt: -1,
    });
    const mobiles = await Mobile.find().sort({
      isFeatured: -1,
      createdAt: -1,
    });

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

    const latitude = userData.location.coordinates[1];
    const longitude = userData.location.coordinates[0];

    const option = {
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], 15 / 3962.2],
        },
      },
    };
    const bikes = await Bike.find(option).sort({
      isFeatured: -1,
      createdAt: -1,
    });
    const cars = await Car.find(option).sort({
      isFeatured: -1,
      createdAt: -1,
    });
    const mobiles = await Mobile.find(option).sort({
      isFeatured: -1,
      createdAt: -1,
    });
    const items = { cars, mobiles, bikes };
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
      err,
    });
  }
};

const findByUserId = async (req, res) => {
  const userId = req.params.userId;
  const response = await Product.find({ seller_id: userId }).sort({
    isFeatured: -1,
    createdAt: -1,
  });
  return res.status(200).send(response);
};

module.exports = { findAllProduct, findAll, search, findnearest, findByUserId };

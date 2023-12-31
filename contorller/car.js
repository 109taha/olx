const fs = require("fs");
const cron = require("node-cron");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Car } = require("../models/car/car");
const { Product } = require("../models/product");
const cloudinary = require("../helper/cloudinary");
const CarMaker = require("../models/car/carMaker");
const CarModel = require("../models/car/carModel");
const CarFeature = require("../models/car/carFeature");
const CarRegCity = require("../models/car/carRegisterationCity");
const City = require("../models/cities");

const createCarAdd = async (req, res) => {
  const files = req.files;
  const attachArtwork = [];
  try {
    if (!files || files?.length < 1)
      return res.status(401).json({
        message: "You have to upload at least one image to the listing",
      });
    for (const file of files) {
      const { path } = file;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "olx",
        });
        attachArtwork.push({ url: uploader.url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attachArtwork?.length) {
          const imgs = imgObjs.map((obj) => obj.public_id);
          cloudinary.api.delete_resources(imgs);
        }
        console.log(err);
      }
    }
    const {
      title,
      description,
      maker,
      model,
      year,
      KMsDriven,
      fuel,
      registrationCity,
      documants,
      assembly,
      transmission,
      features,
      condition,
      isFeatured,
      isFeaturedData,
      price,
      latitude,
      longitude,
      city,
    } = req.body;
    if (
      !title ||
      !description ||
      !maker ||
      !model ||
      !year ||
      !KMsDriven ||
      !fuel ||
      !registrationCity ||
      !documants ||
      !assembly ||
      !transmission ||
      !features ||
      !condition ||
      !price ||
      !latitude ||
      !longitude ||
      !city
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;

    const cities = new City({
      city,
    });
    const carMakers = new CarMaker({
      maker,
    });

    const carModel = new CarModel({
      model,
    });

    const registration = new CarRegCity({
      registrationCity,
    });

    const carFeature = new CarFeature({
      features,
    });

    const users = await User.findById(userId);
    const contact_Number = users.phone_number;
    const name = users.first_name + " " + users.last_name;

    const product = new Car({
      seller_id: userId,
      title,
      description,
      maker: carMakers,
      model: carModel,
      year,
      KMsDriven,
      fuel,
      registrationCity: registration,
      documants,
      assembly,
      transmission,
      features: carFeature,
      condition,
      price,
      isFeatured,
      isFeaturedData,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
      city: cities,
      pics: attachArtwork.map((x) => x.url),
    });

    if (product.isFeatured === true) {
      const scheduledJob = cron.schedule("* * */10 * *", async () => {
        try {
          console.log("123");
          const updatedProduct = await Car.findByIdAndUpdate(
            product._id,
            { isFeatured: false, isFeaturedData: null },
            { new: true }
          );
          console.log(
            `Updated isFeatured to false for product with ID: ${updatedProduct._id}`
          );
          scheduledJob.stop();
          console.log("isFeature is completed not its Of");
        } catch (error) {
          console.error("An error occurred:", error);
        }
      });
    }
    const userData = await Product.find({ seller_id: product.seller_id });
    if (userData.length >= 4) {
      return res
        .status(400)
        .send({ message: "you are not allow to create 5th ad" });
    }

    const products = new Product({
      seller_id: product.seller_id,
      product_id: product._id,
      product_type: "Car",
    });

    await cities.save();
    await carFeature.save();
    await registration.save();
    await carModel.save();
    await carMakers.save();
    await product.save();
    await products.save();
    res.status(200).send({
      message: "product added successfully",
      data: product,
      Seller_Name: name,
      Seller_Number: contact_Number,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const findAllCar = async (req, res) => {
  try {
    const products = await Car.find({}).sort({
      isFeatured: -1,
      createdAt: -1,
    });
    if (!products) {
      return res.status(400).send({
        message: "No Cars Found",
      });
    }
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const findCarById = async (req, res) => {
  try {
    const mobileId = req.params.mobileId;
    const product = await Car.findById(mobileId)
      .populate("model")
      .populate("maker")
      .populate("registrationCity")
      .populate("features")
      .populate("city");
    if (!product) {
      return res.status(400).send({
        message: "no car on that Id",
      });
    }
    const userId = product.seller_id.toString();
    const user = await User.findById(userId);
    const name = user.first_name + " " + user.last_name;
    const number = user.phone_number;

    res.status(200).send({
      data: product,
      seller_Name: name,
      seller_Contact: number,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const findUserCar = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userProducts = await Car.find({ seller_id: userId });

    if (userProducts.length === 0) {
      return res.status(400).send({
        message: "You haven't created any cars for sale.",
      });
    }

    return res.status(200).send({
      data: userProducts,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const updateCar = async (req, res) => {
  try {
    const updateData = req.body;
    const productId = req.params.productId;
    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;

    // Check if the user has the right to update this product
    const product = await Car.findById(productId);
    if (!product) {
      return res.status(400).send({
        message: "No product found for that ID",
      });
    }
    if (product.seller_id.toString() !== userId) {
      return res.status(403).send({
        message: "You are not allowed to update this product",
      });
    }

    const updatedProduct = await Car.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(400).send({
        message: "No product found for that ID",
      });
    }

    return res.status(200).send({ data: updatedProduct });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;

    const product = await Car.findById(productId);

    if (!product) {
      return res.status(400).send({
        message: "No product found for that ID",
      });
    }

    const carFeature = await CarFeature.find(product.features);
    const registration = await CarRegCity.find(product.registrationCity);
    const productFind = await Product.find({ product_id: productId });
    const findingmaker = await CarMaker.find(product.maker);
    const findingmodel = await CarModel.find(product.model);

    if (product.seller_id.toString() !== userId) {
      return res.status(403).send({
        message: "You are not allowed to delete this product",
      });
    }

    await CarFeature.findByIdAndDelete(carFeature[0]._id.toString());
    await CarRegCity.findByIdAndDelete(registration[0]._id.toString());
    await CarModel.findByIdAndDelete(findingmodel[0]._id.toString());
    await CarMaker.findByIdAndDelete(findingmaker[0]._id.toString());
    await Product.findByIdAndDelete(productFind[0]._id.toString());
    await Car.findByIdAndDelete(productId);

    return res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const serchFeildCar = async (req, res) => {
  try {
    const searchfield = req.params.title;
    const data = await Car.find({
      title: { $regex: searchfield, $options: "i" },
    });

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const findnearestcar = async (req, res) => {
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
    const cars = await Car.find(option);
    res.status(200).send(cars);
  } catch (err) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

module.exports = {
  createCarAdd,
  findAllCar,
  findCarById,
  findUserCar,
  updateCar,
  deleteCar,
  serchFeildCar,
  findnearestcar,
};

const { Car } = require("../models/car");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const cloudinary = require("../helper/cloudinary");
const fs = require("fs");
const { Product } = require("../models/product");

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
      price,
      latitude,
      longitude,
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
      !longitude
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;

    const users = await User.findById(userId);
    const contact_Number = users.phone_number;
    const name = users.first_name + " " + users.last_name;
    const product = new Car({
      seller_id: userId,
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
      price,
      isFeatured,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
      pics: attachArtwork.map((x) => x.url),
    });

    await product.save();

    console.log(product.isFeatured);
    if (product.isFeatured === true) {
      const scheduledJob = cron.schedule("* * */10 * *", async () => {
        try {
          const updatedProduct = await Car.findByIdAndUpdate(
            product._id,
            { isFeatured: false },
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

    const products = new Product({
      seller_id: product.seller_id,
      product_id: product._id,
      product_type: "Car",
    });
    await products.save();
    res.status(200).send({
      message: "product added successfully",
      data: product,
      Seller_Name: name,
      Seller_Number: contact_Number,
    });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

const findAllCar = async (req, res) => {
  try {
    const products = await Car.find();
    if (!products) {
      return res.status(400).send({
        message: "No Cars Found",
      });
    }
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
const findCarById = async (req, res) => {
  try {
    const mobileId = req.params.mobileId;
    const product = await Car.findById(mobileId);
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
    return res.status(500).send({
      message: "internal server error",
    });
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
    console.error(error);

    return res.status(500).send({
      message: "Internal server er2ror",
    });
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
    console.error(error);
    return res.status(500).send({ message: "An error occurred" });
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
    if (product.seller_id.toString() !== userId) {
      return res.status(403).send({
        message: "You are not allowed to delete this product",
      });
    }

    await Car.findByIdAndDelete(productId);

    return res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "An error occurred" });
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
    console.error("Error while searching for products:", error);
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).send({
      message: "Internal server error",
      err,
    });
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

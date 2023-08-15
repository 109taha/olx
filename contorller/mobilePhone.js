const { Mobile } = require("../models/mobilePhone");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const cloudinary = require("../helper/cloudinary");
const fs = require("fs");

const createMobileAdd = async (req, res) => {
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
    console.log(attachArtwork.map((x) => x.url));
    const { title, description, brand, condition, price, location } = req.body;
    if (!title || !description || !brand || !condition || !price || !location) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;

    const users = await User.findById(userId);
    const contact_Number = users.phone_number;

    const product = new Mobile({
      seller_id: userId,
      title,
      description,
      brand,
      condition,
      price,
      location,
      contact_Number,
      pics: attachArtwork.map((x) => x.url),
    });

    await product.save();
    res
      .status(200)
      .send({ message: "product added successfully", data: product });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

const findAllMobiles = async (req, res) => {
  try {
    console.log("123");
    const products = await Mobile.find();
    if (!products) {
      return res.status(400).send({
        message: "No mobile-Phone Found",
      });
    }
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
const findMobileById = async (req, res) => {
  try {
    const mobileId = req.params.mobileId;
    console.log(mobileId);
    const product = await Mobile.findById(mobileId);
    if (product.length === 0) {
      return res.status(400).send({
        message: "no Mobile found on that Id",
      });
    }
    res.status(200).send({
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      message: "internal server error",
    });
  }
};

const findUserMobiles = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userProducts = await Mobile.find({ seller_id: userId });

    if (userProducts.length === 0) {
      return res.status(400).send({
        message: "You haven't created any mobile phones for sale.",
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

// Export the function to be used as a route handler
module.exports = findUserMobiles;

module.exports = {
  createMobileAdd,
  findAllMobiles,
  findMobileById,
  findUserMobiles,
};

const ADD = require("../models/adFeature");
const { User } = require("../models/user");
const fs = require("fs");
const cloudinary = require("../helper/cloudinary");
const jwt = require("jsonwebtoken");

const createAD = async (req, res) => {
  try {
    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;
    const findingUser = await User.find({ _id: userId });

    const adminUser = findingUser[0].role;
    if (adminUser !== "Admin") {
      return res.status(403).send({
        message: "You Are Not Admin",
      });
    }

    const AD_placment = req.body.AD_placment;
    if (!AD_placment) {
      res.status(400).send({
        message: "You Have To Send The Placment Where You Wanna Show The ADD",
      });
    }
    const files = req.files;
    const attachArtwork = [];

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
    const featureADD = new ADD({
      AD_placment,
      AD_pic: attachArtwork[0].url,
    });

    featureADD.save();

    res
      .status(200)
      .send({ message: "ADD created successfully", Data: featureADD });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const updateAd = async (req, res) => {
  try {
    const updateData = req.body;
    const addId = req.params.addId;
    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;
    const findingUser = await User.find({ _id: userId });
    const adds = await ADD.findById(addId);

    const adminUser = findingUser[0].role;
    if (adminUser !== "Admin") {
      return res.status(403).send({
        message: "You Are Not Admin",
      });
    }

    const updatedProduct = await ADD.findByIdAndUpdate(addId, updateData, {
      new: true,
    });
    console.log(updatedProduct);
    console.log(adds);
    if (!updatedProduct) {
      return res.status(400).send({
        message: "No product found for that ID",
      });
    }

    return res.status(200).send({ data: updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const findAdd = async (req, res) => {
  try {
    const findadds = await ADD.find();
    if (!findadds) {
      return res.status(400).send({ message: "Cant find any ADD!" });
    }
    return res.status(200).send({ success: true, findadds });
  } catch (err) {
    return res.status(500).send({ message: "Internal server Error" });
  }
};

const findOneAdd = async (req, res) => {
  try {
    const AddId = req.params.AddId;
    const findadds = await ADD.findById(AddId);
    if (!findadds) {
      return res.status(400).send({ message: "Cant find any ADD!" });
    }
    return res.status(200).send({ success: true, findadds });
  } catch (error) {
    return res.status(500).send({ message: "Internal server Error" });
  }
};

module.exports = { createAD, updateAd, findAdd, findOneAdd };

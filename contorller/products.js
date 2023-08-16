const jwt = require("jsonwebtoken");
const { Product } = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, status, location } = req.body;

    if (!title || !description || !category || !price || !status || !location) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const user = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
    const userId = decryptedToken.userId;

    const product = new Product({
      seller_id: userId,
      title,
      description,
      category,
      price,
      status,
      location,
    });

    await product.save();
    res
      .status(200)
      .send({ message: "product added successfully", data: product });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    throw error;
  }
};

const findProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product.length === 0) {
      return res.status(400).send({
        message: "no product found on that Id",
      });
    }
    res.status(200).send({
      data: product,
    });
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateData = req.body;
    const productId = req.params.productId;
    const updatedproduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );
    if (productId.length === 0) {
      return res.status(400).send({
        message: "no product found on that Id",
      });
    }
    return res.status(200).send({ data: updatedproduct });
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByIdAndDelete(productId);
    if (product.lenght === 0) {
      return res.status(400).send({
        message: "no product found on that Id",
      });
    }
    return res.status(200).send({
      message: "product deleted sccessfully",
    });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong!" });
  }
};

const findUserProducts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userProducts = await Product.find({ seller_id: userId });
    if (userProducts.length === 0) {
      return res.status(400).send({
        message: "you didnt create any AD",
      });
    }
    return res.status(200).send({
      data: userProducts,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  findUserProducts,
};

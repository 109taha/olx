const { Product } = require("../models/product");

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

const serchfeildproduct = (req, res) => {
  const searchfield = req.params.product_type;
  const data = Product.find({
    product_type: { $regex: searchfield, $options: "$i" },
  });
  res.status(200).send(data);
};

module.exports = { findAllProduct };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const City = require("../models/cities");

const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      latitude,
      longitude,
      city,
      role,
    } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !latitude ||
      !longitude ||
      !city
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered" });
    }

    const existingUserbyusername = await User.findOne({ username });
    if (existingUserbyusername) {
      return res
        .status(400)
        .send({ message: "Username is already registered" });
    }

    const cities = new City({
      city,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone_number,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
      city: cities,
      role,
    });

    await cities.save();
    await user.save();

    return res
      .status(200)
      .send({ message: "User Created Successfully!", user });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET /*, {
            expiresIn: '1h', // Token expires in 1 hour
        }*/
    );

    return res.status(200).send({ JWT: token, data: user });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const logoutUser = async () => {
  // You don't need to do anything specific for logout with JWT
  // Tokens are stateless and are invalidated on the client side
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        message: "No user found with that ID",
      });
    }
    return res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

const findUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "No user found with that ID",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  findUserById,
};

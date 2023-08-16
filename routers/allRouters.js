const express = require("express");
const router = express.Router();

//middleware
const verifyuser = require("../middlewares/verifyUser");
const upload = require("../helper/multer");

//controller
const {
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  findUserById,
} = require("../contorller/user");
const {
  createProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  findUserProducts,
} = require("../contorller/products");
const {
  createMobileAdd,
  findAllMobiles,
  findMobileById,
  findUserMobiles,
  deleteMobile,
  updateMobile,
} = require("../contorller/mobilePhone");
const {
  createCarAdd,
  findAllCar,
  findCarById,
  findUserCar,
  updateCar,
  deleteCar,
} = require("../contorller/car");
const {
  createbikeAdd,
  findUserBike,
  findBikeById,
  findAllbike,
  updateBike,
  deleteBike,
} = require("../contorller/bike");

//users
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/findUserById/:userId", findUserById);
router.delete("/deleteUser/:userId", deleteUser);

//products
router.post("/createProduct", verifyuser, createProduct);
router.get("/findAllProducts", findAllProducts);
router.get("/findProductById/:productId", findProductById);
router.get("/findUserProducts/:userId", findUserProducts);
router.put("/updateProduct/:productId", updateProduct);
router.delete("/deleteProduct/:productId", verifyuser, deleteProduct);

//Mobile phone
router.post(
  "/createMobileAdd",
  verifyuser,
  upload.array("attachArtwork", 20),
  createMobileAdd
);
router.get("/findAllMobiles", findAllMobiles);
router.get("/findMobileById/:mobileId", findMobileById);
router.get("/findUserMobiles/:userId", findUserMobiles);
router.put("/updateMoile/:productId", verifyuser, updateMobile);
router.delete("/deleteMobile/:productId", verifyuser, deleteMobile);

//car
router.post(
  "/createCarAdd",
  verifyuser,
  upload.array("attachArtwork", 20),
  createCarAdd
);
router.get("/findAllCar", findAllCar);
router.get("/findCarById/:mobileId", findCarById);
router.get("/findUserCar/:userId", findUserCar);
router.put("/updateCar/:productId", verifyuser, updateCar);
router.delete("/deleteCar/:productId", verifyuser, deleteCar);

//bike
router.post(
  "/createBike",
  verifyuser,
  upload.array("attachArtwork", 20),
  createbikeAdd
);
router.get("/findAllbike", findAllbike);
router.get("/findBikeById/:mobileId", findBikeById);
router.get("/findUserBike/:userId", findUserBike);
router.put("/updateBike/:productId", verifyuser, updateBike);
router.delete("/deleteBike/:productId", verifyuser, deleteBike);

module.exports = router;

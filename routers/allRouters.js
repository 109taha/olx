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
  createMobileAdd,
  findAllMobiles,
  findMobileById,
  findUserMobiles,
  deleteMobile,
  updateMobile,
  serchFeildMobile,
} = require("../contorller/mobilePhone");
const {
  createCarAdd,
  findAllCar,
  findCarById,
  findUserCar,
  updateCar,
  deleteCar,
  serchFeildCar,
} = require("../contorller/car");
const {
  createbikeAdd,
  findUserBike,
  findBikeById,
  findAllbike,
  updateBike,
  deleteBike,
  serchFeildBike,
} = require("../contorller/bike");
const { findAllProduct, findAll, search } = require("../contorller/products");

//users
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/findUserById/:userId", findUserById);
router.delete("/deleteUser/:userId", deleteUser);

//products
router.get("/findAllProduct", findAllProduct);
router.get("/finding", findAll);
router.get("/search/:title", search);

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
router.get("/mobile/:title", serchFeildMobile);

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
router.get("/car/:title", serchFeildCar);

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
router.get("/bike/:title", serchFeildBike);

module.exports = router;

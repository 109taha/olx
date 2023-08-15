const express = require('express')
const router = express.Router();

//middleware
const verifyuser = require("../middlewares/verifyUser")
const upload = require('../helper/multer')

//controller
const { createUser, loginUser, logoutUser, deleteUser, findUserById } = require('../contorller/user');
const { createProduct, findAllProducts, findProductById, updateProduct, deleteProduct, findUserProducts } = require('../contorller/products');
const { createMobileAdd } = require("../contorller/mobilePhone");
const { createCarAdd } = require('../contorller/car');
const { createbikeAdd } = require('../contorller/bike');

//users
router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/:userId', findUserById);

router.delete('/:userId', deleteUser);

//products
router.post('/createProduct', verifyuser, createProduct);

router.get('/', findAllProducts);

router.get('/product/:productId', findProductById);

router.put('/updatedProduct/:productId', updateProduct);

router.get('/user/:userId', findUserProducts);

router.delete('/delete/:productId', verifyuser, deleteProduct);


//Mobile phone
router.post('/createMobile', verifyuser, upload.array("attachArtwork", 20), createMobileAdd);


//car
router.post('/createCar', verifyuser, upload.array("attachArtwork", 20), createCarAdd);


//bike
router.post('/createBike', verifyuser, upload.array("attachArtwork", 20), createbikeAdd);

module.exports = router;
const express = require('express')
const router = express.Router();

//middleware
const verifyuser = require("../middlewares/verifyUser")

//controller
const { createUser, loginUser, logoutUser, deleteUser, findUserById } = require('../contorller/user');
const { createProduct, findAllProducts, findProductById, updateProduct, deleteProduct, findUserProducts } = require('../contorller/products');
const { createMobileAdd } = require("../contorller/mobilePhone")

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
router.post('/createMobile', verifyuser, createMobileAdd);


module.exports = router;